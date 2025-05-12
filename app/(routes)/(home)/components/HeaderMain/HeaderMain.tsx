"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { dataHeaderMain } from "./HeaderMain.data";
import { useState } from "react";
import FormAddElement from "../FormAddElement/FormAddElement";
import { HeaderMainProps } from "./HeaderMain.types";

const HeaderMain = (props: HeaderMainProps) => {
  const { userId } = props;
  const [typeElement, setTypeElement] = useState<"password" | "folder" | "">();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const closeDialogAndDropdown = () => {
    setOpenDialog(false);
    setOpenDropdown(false);
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl md:text-3xl font-sans">Todas las cajas fuertes</h1>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
          <DropdownMenuTrigger asChild>
            <Button className="font-light">
              Nueva <ChevronDown></ChevronDown>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-0">
            <DropdownMenuLabel>
              <DialogTrigger asChild>
                <div className="flex flex-col">
                  {dataHeaderMain.map(({ icon: Icon, typeElement, text }) => (
                    <Button
                      key={typeElement}
                      className="justify-start"
                      variant={"ghost"}
                      onClick={() => setTypeElement(typeElement)}
                    >
                      <Icon className="w-4 h-4 mr-2"></Icon>
                      {text}
                    </Button>
                  ))}
                </div>
              </DialogTrigger>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle className="font-medium">Nuevo elemento</DialogTitle>
          </DialogHeader>
          {typeElement === "password" ? (
            <FormAddElement
              userId={userId}
              closeDialog={closeDialogAndDropdown}
            ></FormAddElement>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeaderMain;
