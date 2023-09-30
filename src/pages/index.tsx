import EditorMenu from "@/components/EditorMenu.tsx";
import DataTable from "@/components/DataTable.tsx";
import Editor from "@/components/Editor.tsx";

export default function Index() {
    return (
        <div
            className="w-full bg-background h-screen flex flex-col max-h-screen overflow-auto"
        >
            <EditorMenu />
            <Editor />
            <div
                className="border-b-accent border-b-2 flex-1 text-foreground overflow-auto"
            >
                <DataTable />
            </div>
        </div>
    );
}