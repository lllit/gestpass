import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

// async function checkDB() {
//     try {
//         const users = await db.user.findMany();
//         console.log(users);
//     } catch (error) {
//         console.error("Error conectando a la BD:", error);
//     }
// }

// checkDB();



export async function POST(req: Request) {
    try {
        const { email, password, username } = await req.json();
        const hashedPassword = await hash(password, 10);

        if (!email || !password || !username) {
            return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
        }

        const user = await db.user.create({
            data: {
                email,
                hashedPassword,
                username
            }
        });
        return NextResponse.json(user, { status: 201 });


    } catch (error) {
        console.error("Error al registrar usuario:", error);

        return new NextResponse(`Internal Error: ${error}`, { status: 500 })
    }
}