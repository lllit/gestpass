"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Element } from "@/lib/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, MoreHorizontal, User } from "lucide-react";
import { toast } from "sonner";

export type ColumProps = Element;

export const columns: ColumnDef<ColumProps>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "typeElement",
    header: "Tipo de Elemento",
  },
  {
    accessorKey: "urlWebsite",
    header: "Url Website",
  },
  {
    accessorKey: "directory",
    header: "Directorio",
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const password = row.original.password;
      const username = row.original.username;

      const onEditElement = () => {
        window.location.href = `/element/${row.original.id}`;
      };
      const copyItemClipboard = (item: string, name: string) => {
        navigator.clipboard.writeText(item);
        toast(`${name} copy!`);
      };

      return (
        <div className="flex gap-2 justify-center items-center">
          {password ? (
            <Copy
              className="w-4 h-4 cursor-pointer"
              onClick={() => copyItemClipboard(password, "Password")}
            />
          ) : null}

          {username ? (
            <User
              className="w-4 h-4 cursor-pointer"
              onClick={() => copyItemClipboard(username, "Username")}
            />
          ) : null}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4 cursor-pointer"></MoreHorizontal>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={onEditElement}>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
