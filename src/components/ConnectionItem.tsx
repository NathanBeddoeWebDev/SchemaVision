import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu.tsx";
import {
  DeleteIcon,
  PencilIcon,
  PlusCircleIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import React from "react";

export default function ConnectionItem({
  connectionName,
  connectionPath,
}: {
  connectionName: string;
  connectionPath: string;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <a
          href={connectionPath}
          className="flex items-center rounded-lg px-4 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
        >
          <span className="flex-1 whitespace-nowrap select-none">
            {connectionName}
          </span>
        </a>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <PencilIcon className={"w-4 h-4 text-amber-600"}></PencilIcon>
          <span className={"pl-4"}>Edit Connection</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <Trash2Icon className={"w-4 h-4 text-red-600"}></Trash2Icon>
          <span className={"pl-4"}>Delete Connection</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
