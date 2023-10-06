import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {Button} from "@/components/ui/button.tsx";
import {Play, Square} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import router from "@/lib/router.ts";

export default function EditorMenu() {
    return (
        <Menubar className={"text-foreground pl-4"}>
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        New Query <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        Save Query <MenubarShortcut>⌘S</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        Open Query <MenubarShortcut>⌘O</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator/>
                    <MenubarItem>
                        Print... <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator/>
                    <MenubarSub>
                        <MenubarSubTrigger>Find</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Search the web</MenubarItem>
                            <MenubarSeparator/>
                            <MenubarItem>Find...</MenubarItem>
                            <MenubarItem>Find Next</MenubarItem>
                            <MenubarItem>Find Previous</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator/>
                    <MenubarItem>Cut</MenubarItem>
                    <MenubarItem>Copy</MenubarItem>
                    <MenubarItem>Paste</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                    <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
                    <MenubarCheckboxItem checked>
                        Always Show Full URLs
                    </MenubarCheckboxItem>
                    <MenubarSeparator/>
                    <MenubarItem inset>
                        Reload <MenubarShortcut>⌘R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled inset>
                        Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator/>
                    <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                    <MenubarSeparator/>
                    <MenubarItem inset>Hide Sidebar</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <Separator orientation={"vertical"}></Separator>
            <Button title={"Execute SQL"} variant={"ghost"}><Play className={"w-5 h-5 text-green-500"}></Play></Button>
            <Separator orientation={"vertical"}></Separator>
            <Button title={"Stop SQL"} variant={"ghost"}><Square className={"w-5 h-5 text-red-500"}></Square></Button>
            <span className={"ml-auto"}>
                {router.state.location.pathname}

            </span>
        </Menubar>
    )
}
