import EditorMenu from "@/components/EditorMenu.tsx";
import DataTable from "@/components/DataTable.tsx";
import Editor from "@/components/Editor.tsx";
import type Database from "tauri-plugin-sql-api";
import {Connection} from "@/bindings.ts";


export default function ConnectionPage({
                                           useRouteContext,
                                       }: {
    useRouteContext: () => { connection: Connection, db: Database };
}) {
    const {connection, db} = useRouteContext();
    console.log(connection, db)
    return (
        <div className="w-full bg-background h-screen flex flex-col max-h-screen overflow-auto">
            <EditorMenu/>
            <Editor db={db}/>
            <div className="border-b-accent border-b-2 flex-1 text-foreground overflow-auto">
                <DataTable/>
            </div>
        </div>
    );
}
