import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";

export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const {id} = params;
        const catalogueBook = await prisma.catalogueBook.findFirst({where: {id}});
        if(!catalogueBook)
            return NextResponse.json({message: "Catalogue Book not found"},{status:404});

        return NextResponse.json({
            data:catalogueBook,
            message: "Catalogue Book fetching successfully",
            success: true,
        },{status:200})
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching Catalogue Book: " + message, {
            status: 500
        });
    }
}

export async function PUT(req:NextRequest, {params} : {params: {id:string}}) {
    try {
        const {id} = params;
        const catalogueBook = await prisma.catalogueBook.findFirst({where:{id}});
        if(!catalogueBook)
            return NextResponse.json({ message: "Catalogue Book not found", success: false }, { status: 404 });
        const body = await req.json();
        const updatedCatalogueBook = await prisma.catalogueBook.update({
            where: {id},
            data: {
                catalogueId: body.catalogueId,
                version: body.version,
                name_en: body.name_en,
                name_km: body.name_km,
                type_en: body.type_en,
                type_km: body.type_km,
                size_en: body.size_en,
                size_km: body.size_km,
                code: body.code,
                isbn: body.isbn,
                image:  body.image,
            }
        });
        return NextResponse.json({
            data:updatedCatalogueBook,
            message: "Catalogue Book updated successfully",
            success: true,
        }, {status: 200});
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching Catalogue Book: " + message, {
            status: 500
        });
    }
}

export async function DELETE(req:NextRequest, {params} : {params:{id:string}}) {
    try {
        const {id} = params;
        console.log(id);
        const catalogueBook = await prisma.catalogueBook.findFirst({where:{id}});
        if(!catalogueBook)
            return NextResponse.json({message: "Catalogue Book not found", status:404});

        const deletedCatalogueBook = await prisma.catalogueBook.delete({where:{id}});
        return NextResponse.json({
            data:deletedCatalogueBook,
            message: "Catalogue Book deleted successfully",
            success: true,
        },{status:200})

    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching Catalogue Book: " + message, {
            status: 500
        });
    }
}