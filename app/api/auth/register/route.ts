import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password, username } = await req.json();
        const hashedPassword = await hash(password, 10);

        if (!email || !password) {
            return new NextResponse("Missing required fields", { status: 400 })

        }
        const user = await db.user.create({
            data: {
                email,
                hashedPassword,
                username
            }
        });
        return NextResponse.json(user);

    } catch (error) {
        return new NextResponse(`Internal Error: ${error}`, { status: 500 })
    }
}