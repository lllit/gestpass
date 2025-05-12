import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {
            typeElement,
            isFavourite,
            name,
            directory,
            username,
            password,
            urlWebsite,
            notes,
            userId
        } = await req.json();

        const element = await db.element.create({
            data: {
                typeElement,
                isFavourite,
                name,
                directory,
                username,
                password,
                urlWebsite,
                notes,
                userId
            }
        })


        return NextResponse.json(element);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal error", { status: 500 });
    }
}