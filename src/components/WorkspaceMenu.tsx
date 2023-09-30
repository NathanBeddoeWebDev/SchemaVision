import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {PlusCircleIcon, PlusIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export default function WorkspaceMenu() {
    return (
        <Menubar className={"text-foreground rounded-none"}>
            <Button asChild title={"Create Connection"} variant={"ghost"} size={"sm"}>
                <a href={"/connections/create"}>
                    <PlusIcon></PlusIcon>
                </a>
            </Button>
            <MenubarMenu>
                <MenubarTrigger>
                    Manage
                </MenubarTrigger>
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
                    <MenubarSeparator />
                    <MenubarItem>
                        Print... <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>

        </Menubar>
    )
}
