"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import { FormProfileProps } from "./FormProfile.types";

import { formSchema } from "./FormProfile.form";
import Image from "next/image";
import { useState } from "react";
import { UploadButton } from "@/lib/uploadThing";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

export function FormProfile(props: FormProfileProps) {
  const { user } = props;
  const router = useRouter();
  const [showUpdaloadPhoto, setShowUpdaloadPhoto] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      profileImage: user.profileImage || "",
      username: user.username || "",
      id: user.id,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch("/api/profile", values);
      toast("Perfil actualizado!");
      router.refresh();
      setShowUpdaloadPhoto(false);
      setPhotoUploaded(false);
    } catch (error) {
      toast("Algo salio mal :'c");
      console.log(error);
      
    }
  };
  return (
    <div className="max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-2">
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen de perfil</FormLabel>
                <FormControl>
                  <div>
                    <div className="flex gap-2 items-center">
                      <Image
                        src={
                          user.profileImage
                            ? user.profileImage
                            : "/images/default-profile.jpg"
                        }
                        alt="Image profile"
                        width={60}
                        height={60}
                        className="rounded-full"
                      ></Image>
                      <div className="w-[200px] ">
                        {showUpdaloadPhoto ? (
                          <UploadButton
                            className="rounded-md text-slate-800 bg-slate-200 mt-3 "
                            {...field}
                            endpoint="profileImage"
                            onClientUploadComplete={(res) => {
                              form.setValue("profileImage", res?.[0].url);
                              setPhotoUploaded(true);
                            }}
                            onUploadError={(error: Error) => console.log(error)}
                          ></UploadButton>
                        ) : (
                          <Button
                            onClick={() =>
                              setShowUpdaloadPhoto((prev) => !prev)
                            }
                            className="cursor-pointer"
                          >
                            <Upload className="mr-2 w-4 h-4"></Upload>Cambiar
                            foto
                          </Button>
                        )}
                      </div>
                    </div>
                    {photoUploaded ? (
                      <p className="text-sm pt-2">Imagen subida con éxito</p>
                    ) : null}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>

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
                  <Input placeholder="Orwell" {...field} />
                </FormControl>

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
                  <Input placeholder="@sait" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Guardar</Button>
        </form>
      </Form>
    </div>
  );
}
