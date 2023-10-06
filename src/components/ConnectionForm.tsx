import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useNavigate } from "@tanstack/react-router";
import useCreateConnection from "@/lib/mutations/createConnection.ts";
import { useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import { File } from "lucide-react";
import { open } from "@tauri-apps/api/dialog";

const formSchema = z.object({
  connectionString: z.string().nullable(),
  dbType: z.enum(["MySQL", "PostgreSQL", "SQLite", "SQLServer", "MariaDB"]),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  host: z
    .string()
    .ip({ version: "v4" })
    .or(z.string().url({ message: "Host must be a valid URL" }))
    .or(z.string().regex(/localhost/, { message: "Host must be a valid URL" })),
  port: z.number().min(1),
  authType: z.enum(["username", "ssl", "windows"]),
  username: z.string(),
  password: z.string(),
});

export function ConnectionForm() {
  const { mutate } = useCreateConnection();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      authType: "username",
      dbType: "SQLite",
      port: 3306,
      host: "localhost",
      username: "",
      password: "",
    },
  });

  async function onSubmit() {
    console.log("submitting");
    mutate({
      id: null,
      name: form.getValues("name"),
      dbms: form.getValues("dbType"),
      host: form.getValues("host"),
      port: form.getValues("port"),
      user: form.getValues("username"),
      password: form.getValues("password"),
      connection_string: form.getValues("connectionString"),
      default_database: "",
      default_schema: "",
      ssl: false,
      ssl_ca: "",
      ssl_cert: "",
      ssl_mode: "",
      ssl_key: "",
      ssl_pass: "",
    });
    await navigate({ to: "/" });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-8/12 mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormLabel>Connection name</FormLabel>
              <FormControl>
                <Input placeholder="My database connection" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr />
        <FormField
          control={form.control}
          name="dbType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RDBMS</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className={""} value="SQLite">
                    SQLite
                  </SelectItem>
                  <SelectItem disabled className={""} value="MySQL">
                    MySQL
                  </SelectItem>
                  <SelectItem disabled className={""} value="SQLServer">
                    Microsoft SQL
                  </SelectItem>
                  <SelectItem disabled className={""} value="PostgreSQL">
                    PostgreSQL
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.getValues("dbType") === "SQLite" && (
          <SqliteConnectionType
            onFileSelect={(value) => {
              form.setValue("connectionString", value);
            }}
          ></SqliteConnectionType>
        )}
        {form.getValues("dbType") !== "SQLite" && (
          <div className={"flex gap-2"}>
            <FormField
              control={form.control}
              name="host"
              render={({ field }) => (
                <FormItem className={"w-8/12"}>
                  <FormLabel>Host</FormLabel>
                  <FormControl>
                    <Input placeholder="Host (ip or URL)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="port"
              render={({ field }) => (
                <FormItem className={"w-4/12"}>
                  <FormLabel>Port</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder=""
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <hr />
        <FormField
          control={form.control}
          name="authType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Authentication Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className={""} value="username">
                    Username / Password
                  </SelectItem>
                  <SelectItem className={""} value="ssl">
                    SSL
                  </SelectItem>
                  <SelectItem className={""} value="windows">
                    Windows Auth
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={"flex gap-2"}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className={"w-6/12"}>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className={"w-6/12"}>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type={"password"} placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}

function SqliteConnectionType({
  onFileSelect,
}: {
  onFileSelect: (path: string) => void;
}) {
  const [sqLiteConnType, setSqlLiteConnType] = useState("file");

  async function onFileClick() {
    const selected = (await open({
      defaultPath: "~",
      multiple: false,
      directory: false,
    })) as string;

    console.log(selected);
    onFileSelect(selected);
  }

  return (
    <>
      <Select
        onValueChange={(value) => setSqlLiteConnType(value)}
        defaultValue={sqLiteConnType}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className={""} value="file">
            File
          </SelectItem>
          <SelectItem className={""} value="http">
            Http(s)
          </SelectItem>
          <SelectItem className={""} value="memory">
            Memory
          </SelectItem>
        </SelectContent>
      </Select>
      {sqLiteConnType === "file" && (
        <FormField
          render={() => {
            return (
              <>
                <div className={"flex gap-2"}>
                  <Label className="sr-only">Path</Label>
                  <Input
                    placeholder="Absolute path to file"
                    className={"w-full"}
                    id={"filePath"}
                    type={"text"}
                  ></Input>

                  <Button
                    variant={"outline"}
                    type="button"
                    className="p-4"
                    onClick={onFileClick}
                  >
                    <File></File>
                    {/* <FormLabel
                      htmlFor="filePathPicker"
                      className="flex items-center justify-center rounded-md p-4"
                    >
                      <Input
                        id="filePathPicker"
                        className={"hidden"}
                        onChange={(event) => {
                          console.log(event.target.files);
                        }}
                        type={"file"}
                      /> */}
                    {/*
                    </FormLabel> */}
                  </Button>
                </div>
              </>
            );
          }}
          name={"path"}
        />
      )}
    </>
  );
}
