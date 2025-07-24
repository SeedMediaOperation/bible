import {generateSlug} from "@/utils/generateSlug";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";

export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const {id} = params;
        const catalogue = await prisma.catalogue.findFirst({where: {id}});
        if(!catalogue)
            return NextResponse.json({message: "Catalogue not found"},{status:404});

        return NextResponse.json({
            data:catalogue,
            message: "Catalogue fetching successfully",
            success: true,
        },{status:200})
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching Catalogue: " + message, {
            status: 500
        });
    }
}

export async function PUT(req:NextRequest, {params} : {params: {id:string}}) {
    try {
        const {id} = params;
        const catalogue = await prisma.catalogue.findFirst({where:{id}});
        if(!catalogue)
            return NextResponse.json({ message: "Catalogue not found", success: false }, { status: 404 });
        const body = await req.json();
        const updatedCatalogue = await prisma.catalogue.update({
            where: {id},
            data: {
                name_en:body.name_en,
                name_km:body.name_km,
                slug:generateSlug(body.name_en),
                image:body.image
            }
        });
        return NextResponse.json({
            data:updatedCatalogue,
            message: "Catalogue updated successfully",
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
        const catalogue = await prisma.catalogue.findFirst({where:{id}});
        if(!catalogue)
            return NextResponse.json({message: "Catalogue not found", status:404});

        const deletedCatalogue = await prisma.catalogue.delete({where:{id}});
        return NextResponse.json({
            data:deletedCatalogue,
            message: "Catalogue deleted successfully",
            success: true,
        },{status:200})

    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching Catalogue: " + message, {
            status: 500
        });
    }
}