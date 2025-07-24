import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";

export async function GET(req:NextRequest, {params} : {params:{id:string}}){
    try {
        const {id} = params;
        const chapter = await prisma.chapter.findFirst({where:{id}});

        if(!chapter)
            return NextResponse.json({message: "Chapter not found"},{status:404});

        return NextResponse.json({
            data:chapter,
            message: "Chapter fetching successfully",
            success: true,
        },{status:200})
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching chapters: " + message, {
            status: 500
        });
    }
}

export async function PUT(req:NextRequest, {params} : {params: {id:string}}) {
    try {
        const {id} = params;
        const chapter = await prisma.chapter.findFirst({where:{id}});
        if(!chapter)
            return NextResponse.json({ message: "Chapter not found", success: false }, { status: 404 });
        const body = await req.json();
        const updatedChapter = await prisma.chapter.update({
            where: {id},
            data: {
                nameEn: body.nameEn,
                nameKm: body.nameKm,
                titleEn:body.titleEn,
                titleKm: body.titleKm,
                paragraphEn:body.paragraphEn,
                paragraphKm:body.paragraphKm,
                bookId:body.bookId
            }
        });
        return NextResponse.json({
            data:updatedChapter,
            message: "Version updated successfully",
            success: true,
        }, {status: 200});
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching chapter: " + message, {
            status: 500
        });
    }
}

export async function DELETE(req:NextRequest, {params} : {params:{id:string}}) {
    try {
        const {id} = params;
        const chapter = await prisma.chapter.findFirst({where:{id}});
        if(!chapter)
            return NextResponse.json({message: "Chapter not found", status:404});

        const deletedChapter = await prisma.chapter.delete({where:{id}});
        return NextResponse.json({
            data:deletedChapter,
            message: "Chapter deleted successfully",
            success: true,
        },{status:200})

    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching Chapter: " + message, {
            status: 500
        });
    }
}