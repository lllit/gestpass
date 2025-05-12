import { PrismaClient } from "@/prisma/prisma/generated/prisma";
const prismaSingleton = () => {
    return new PrismaClient();
};

export const db = prismaSingleton();