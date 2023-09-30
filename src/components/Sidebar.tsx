import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion.tsx";
import ConnectionItem from "@/components/ConnectionItem.tsx";
import { PlusCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu.tsx";
import QueryItem from "@/components/QueryItem.tsx";
import WorkspaceMenu from "@/components/WorkspaceMenu.tsx";
import {Connection} from "@/bindings.ts";
import useConnectionsQuery from "@/lib/queries/getConnectionsQuery.ts";

function Sidebar() {
  const { data } = useConnectionsQuery();
  return (
    <aside
      id="sidebar"
      className={cn("fixed left-0 top-0 z-40 h-screen w-64")}
      aria-label="Sidebar"
    >
      <WorkspaceMenu></WorkspaceMenu>
      <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <Accordion data-state={"open"} type={"multiple"}>
          <AccordionItem value="item-1">
            <ContextMenu>
              <ContextMenuTrigger>
                <AccordionTrigger className={"py-2 px-4"}>
                  <span className="flex text-sm items-center text-slate-900 dark:text-white">
                    Connections
                  </span>
                  <ContextMenuContent>
                    <ContextMenuItem asChild>
                      <a href={"/connections/create"} className={"pl-2"}>
                        <PlusCircleIcon
                          className={"w-4 h-4 text-green-600"}
                        ></PlusCircleIcon>
                        <span className={"pl-2"}>New Connection</span>
                      </a>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </AccordionTrigger>
              </ContextMenuTrigger>
            </ContextMenu>

            <AccordionContent>
              <ul className="text-xs font-medium px-0">
                {data?.map((connection: Connection) => (
                  <li key={connection.id}>
                    <ConnectionItem
                      connectionName={connection.name}
                      connectionPath={`/connections/${connection.id}`}
                    ></ConnectionItem>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className={"py-2 px-4"}>
              <span className="flex text-sm items-center text-slate-900 dark:text-white">
                Recent Queries
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="text-xs font-medium px-0">
                <li>
                  <QueryItem
                    queryName={"Create db"}
                    queryPath={"/"}
                    connectionName={"Local"}
                  ></QueryItem>
                </li>
                <li>
                  <QueryItem
                    queryName={"Drop production db"}
                    queryPath={"/"}
                    connectionName={"Youi Test"}
                  ></QueryItem>
                </li>
                <li>
                  <QueryItem
                    queryName={
                      "Delete Coworker as a user and send HTTP request to Summit API to clear his leave"
                    }
                    queryPath={"/"}
                    connectionName={"Youi Live"}
                  ></QueryItem>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}
export default Sidebar;
