import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";

export async function GET(req:NextRequest, {params} : {params:{id:string}}){
    try {
        const {id} = params;
        const readingDate = await prisma.readingDate.findFirst({where:{id}});

        if(!readingDate)
            return NextResponse.json({message: "Reading Date not found"},{status:404});

        return NextResponse.json({
            data:readingDate,
            message: "Reading Date fetching successfully",
            success: true,
        },{status:200})
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching Reading Dates: " + message, {
            status: 500
        });
    }
}

export async function PUT(req:NextRequest, {params} : {params: {id:string}}) {
    try {
        const {id} = params;
        const readingDate = await prisma.readingDate.findFirst({where:{id}});
        if(!readingDate)
            return NextResponse.json({ message: "Reading Date not found", success: false }, { status: 404 });
        const body = await req.json();
        const updatedReadingDate = await prisma.readingDate.update({
            where: {id},
            data: {
                title_en:body.title_en,
                title_km:body.title_km,
            }
        });
        return NextResponse.json({
            data:updatedReadingDate,
            message: "Reading Date updated successfully",
            success: true,
        }, {status: 200});
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching Reading Dates: " + message, {
            status: 500
        });
    }
}

export async function DELETE(req:NextRequest, {params} : {params:{id:string}}) {
    try {
        const {id} = params;
        const readingDate = await prisma.readingDate.findFirst({where:{id}});
        if(!readingDate)
            return NextResponse.json({message: "Reading Date not found", status:404});

        const deletedReadingDate = await prisma.readingDate.delete({where:{id}});
        return NextResponse.json({
            data:deletedReadingDate,
            message: "Reading Date deleted successfully",
            success: true,
        },{status:200})

    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching Products: " + message, {
            status: 500
        });
    }
}