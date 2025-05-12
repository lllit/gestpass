"use client"
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";

export default function SidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="cursor-pointer">
            <Menu></Menu>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-blue-800 text-white ">
        <SheetHeader className="text-left">
          <SheetTitle className="text-white font-light">GestorPass</SheetTitle>
          <SheetDescription className="text-slate-100 font-light">
            Crea y maneja todas tus contraseñas
          </SheetDescription>
        </SheetHeader>
        <SidebarRoutes></SidebarRoutes>
      </SheetContent>
    </Sheet>
  );
}
