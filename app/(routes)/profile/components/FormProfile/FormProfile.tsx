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
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 py-2">
          <div className="gap-x-8">
            <div className="flex flex-col md:flex-row items-start w-full">
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagen de perfil</FormLabel>
                    <FormControl>
                      <div>
                        <div className="flex gap-0 items-end ">
                          <Image
                            src={
                              user.profileImage
                                ? user.profileImage
                                : "/images/default-profile.jpg"
                            }
                            alt="Image profile"
                            width={200}
                            height={200}
                            className="rounded-full"
                          ></Image>
                          <div className="w-[100px] relative right-17">
                            {showUpdaloadPhoto ? (
                              <UploadButton
                                className="rounded-md text-slate-800 bg-slate-400 mt-3 w-[100px] h-[50px] border border-amber-50"
                                {...field}
                                endpoint="profileImage"
                                onClientUploadComplete={(res) => {
                                  form.setValue("profileImage", res?.[0].url);
                                  setPhotoUploaded(true);
                                }}
                                onUploadError={(error: Error) =>
                                  console.log(error)
                                }
                              ></UploadButton>
                            ) : (
                              <Button
                                onClick={() =>
                                  setShowUpdaloadPhoto((prev) => !prev)
                                }
                                className="cursor-pointer mr-auto bg-[#333638] text-[#c6cdd1] font-normal border border-[#c6cdd1] text-[12px]"
                              >
                                <Upload className="mr-0 w-1 h-1"></Upload>Editar
                              </Button>
                            )}
                          </div>
                        </div>
                        {photoUploaded ? (
                          <p className="text-sm pt-2">
                            Imagen subida con éxito
                          </p>
                        ) : null}
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full md:ml-10">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mt-4 ">
                        <FormLabel>Email</FormLabel>
                        <FormControl className="">
                          <Input disabled {...field} className="bg-[#c7bcbc7c]" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="mt-4">
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
                      <FormItem className="mt-4">
                        <FormLabel>Usuario</FormLabel>
                        <FormControl>
                          <Input placeholder="@sait" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mt-4">Guardar</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
