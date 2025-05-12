import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        // Obtener parámetros desde la URL
        const itemId = req.nextUrl.pathname.split("/").pop();

        if (!itemId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const values = await req.json();

        const element = await db.element.update({
            where: { id: itemId },
            data: { ...values }
        });

        return NextResponse.json(element);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal error", { status: 500 });
    }
}