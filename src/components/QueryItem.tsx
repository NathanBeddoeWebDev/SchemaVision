import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu.tsx";
import {PencilIcon, Trash2Icon} from "lucide-react";
import React from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

type QueryItemProps = {
    queryName: string;
    queryPath: string;
    connectionName: string;
}

export default function QueryItem({queryName, queryPath, connectionName}: QueryItemProps) {
    return (

        <ContextMenu>
            <ContextMenuTrigger>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <a
                                href={queryPath}
                                className="flex items-center rounded-lg px-4 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                            >
                                <span className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">{queryName}</span>
                            </a>
                        </TooltipTrigger>
                        <TooltipContent side={"right"}>
                            <p>Connection: {connectionName}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>
                    <PencilIcon className={"w-4 h-4 text-amber-600"}></PencilIcon>
                    <span className={"pl-4"}>Edit Query</span>
                </ContextMenuItem>
                <ContextMenuItem>
                    <Trash2Icon className={"w-4 h-4 text-red-600"}></Trash2Icon>
                    <span className={"pl-4"}>Delete Query</span>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>

    );
}