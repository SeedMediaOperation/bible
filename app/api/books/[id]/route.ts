import {generateSlug} from "@/utils/generateSlug";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";

export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const {id} = params;
        const book = await prisma.book.findFirst({where: {id}});
        if(!book)
            return NextResponse.json({message: "Book not found"},{status:404});

        return NextResponse.json({
            data:book,
            message: "Book fetching successfully",
            success: true,
        },{status:200})
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching Book: " + message, {
            status: 500
        });
    }
}

export async function PUT(req:NextRequest, {params} : {params: {id:string}}) {
    try {
        const {id} = params;
        const book = await prisma.book.findFirst({where:{id}});
        if(!book)
            return NextResponse.json({ message: "Book not found", success: false }, { status: 404 });
        const body = await req.json();
        const updatedBook = await prisma.book.update({
            where: {id},
            data: {
                nameEn:body.nameEn,
                nameKm:body.nameKm,
                slug:generateSlug(body.nameEn),
                versionId:body.versionId
            }
        });
        return NextResponse.json({
            data:updatedBook,
            message: "Book updated successfully",
            success: true,
        }, {status: 200});
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching Book: " + message, {
            status: 500
        });
    }
}

export async function DELETE(req:NextRequest, {params} : {params:{id:string}}) {
    try {
        const {id} = params;
        const book = await prisma.book.findFirst({where:{id}});
        if(!book)
            return NextResponse.json({message: "Book not found", status:404});

        const deletedBook = await prisma.book.delete({where:{id}});
        return NextResponse.json({
            data:deletedBook,
            message: "Book deleted successfully",
            success: true,
        },{status:200})

    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching Book: " + message, {
            status: 500
        });
    }
}