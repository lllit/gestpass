import { z } from "zod";

export const formSchema = z.object({
    typeElement: z.string().min(2, {
        message: "Elige un elemento"
    }),
    isFavourite: z.boolean(),
    name: z.string().min(2, {
        message: "Minimo tiene que tener 2 caracteres"
    }),
    directory: z.string().min(2, {
        message: "Minimo tiene que tener 2 caracteres"
    }),
    username: z.string().min(2, {
        message: "Minimo tiene que tener 2 caracteres"
    }),
    password: z.string().min(2, {
        message: "Minimo tiene que tener 2 caracteres"
    }),
    urlWebsite: z.string().min(2, {
        message: "Minimo tiene que tener 2 caracteres"
    }),
    notes: z.string(),
    userId: z.string(),

});
