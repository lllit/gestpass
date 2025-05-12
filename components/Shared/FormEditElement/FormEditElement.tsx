"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Earth, Eye, Shuffle } from "lucide-react";
import { copyClipboard } from "@/lib/copyClipboard";
import { useState } from "react";
import { generatePassword } from "@/lib/generatePassword";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormEditElementProps } from "./FormEditElement.types";
import { formSchema } from "./FormEditElement.form";

export function FormEditElement(props: FormEditElementProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { dataElement } = props ?? {};

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeElement: dataElement?.typeElement ?? "",
      isFavourite: dataElement?.isFavourite ?? false,
      name: dataElement?.name ?? "",
      directory: dataElement?.directory ?? "",
      username: dataElement?.username ?? "",
      password: dataElement?.password ?? "",
      urlWebsite: dataElement?.urlWebsite ?? "",
      notes: dataElement?.notes ?? "",
      userId: dataElement?.userId ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/items/${dataElement.id}`, values);
      toast("Item editado.");
      router.push("/");
    } catch (error) {
      console.error("Error en la actualización:", error);
      toast("Algo salio mal!");
    }
  };

  const generateRandomPassword = () => {
    const password = generatePassword();

    form.setValue("password", password);
  };

  const updateUrl = () => {
    form.setValue("urlWebsite", window.location.href);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:grid-cols-2 gap-y-2 gap-x-4 grid"
      >
        <FormField
          control={form.control}
          name="typeElement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Que tipo de elemento necesitas?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona  un directorio para tu contraseña"></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Inicio de sesión">
                    Inicio de sesión
                  </SelectItem>
                  <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                  <SelectItem value="Identidad">Identidad</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isFavourite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                ¿Quieres seleccionar tu contraseña como favorita?
              </FormLabel>
              <div className="flex flex-row items-start space-x-3 space-y-0 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  ></Checkbox>
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Marcar como favorito</FormLabel>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="directory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Directorio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Elige el directorio"></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Social">Social</SelectItem>
                  <SelectItem value="Artes">Artes</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field}></Input>
                  <Copy
                    className="absolute top-3 right-4 cursor-pointer"
                    size={18}
                    onClick={() => copyClipboard(field.value)}
                  ></Copy>
                </div>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="urlWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url website</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field}></Input>
                  <Earth
                    className="absolute top-3 right-4 cursor-pointer"
                    size={18}
                    onClick={updateUrl}
                  ></Earth>
                </div>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                Password
                <Shuffle
                  className="cursor-pointer"
                  size={15}
                  onClick={generateRandomPassword}
                ></Shuffle>
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                  ></Input>
                  <Eye
                    className="absolute top-3 right-10 cursor-pointer"
                    size={18}
                    onClick={() => setShowPassword(!showPassword)}
                  ></Eye>
                  <Copy
                    className="absolute top-3 right-2 cursor-pointer"
                    onClick={() => copyClipboard(field.value)}
                    size={18}
                  ></Copy>
                </div>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>

        <div className="">
          <div className="text-slate-400 flex items-center justify-between text-sm">
            Autenticación TOP
            <p className="px-3 bg-green-700 text-white rounded-lg text-xs mr-5">
              Premium
            </p>
          </div>
          <Input disabled></Input>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea {...field}></Textarea>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <div></div>
        <Button type="submit" className="cursor-pointer">
          Guardar
        </Button>
      </form>
    </Form>
  );
}
