import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function PATCH(req: Request) {
    try {
        const { name, email, profileImage, username, id } = await req.json()
        if (!name || !email || !profileImage || !username) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const profile = await db.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                profileImage,
                username
            }
        })

        return NextResponse.json(profile);
    } catch (error) {
        console.log("[PROFILE_ID]", error);
        return new NextResponse("Internet error", { status: 500 })
    }
}