import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";

export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const {id} = params;
        const vlog = await prisma.vlog.findFirst({where: {id}});
        if(!vlog)
            return NextResponse.json({message: "Vlog not found"},{status:404});

        return NextResponse.json({
            data:vlog,
            message: "Vlog fetching successfully",
            success: true,
        },{status:200})
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching vlog: " + message, {
            status: 500
        });
    }
}

export async function PUT(req:NextRequest, {params} : {params: {id:string}}) {
    try {
        const {id} = params;
        const vlog = await prisma.vlog.findFirst({where:{id}});
        if(!vlog)
            return NextResponse.json({ message: "Vlog not found", success: false }, { status: 404 });
        const body = await req.json();
        const updatedVlog = await prisma.vlog.update({
            where: {id},
            data: {
                title_en: body.title_en,
                title_km: body.title_km,
                paragraph_en:body.paragraph_en,
                paragraph_km:body.paragraph_km,
                video_Url: body.video_Url
            }
        });
        return NextResponse.json({
            data:updatedVlog,
            message: "Vlog updated successfully",
            success: true,
        }, {status: 200});
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching vlog: " + message, {
            status: 500
        });
    }
}

export async function DELETE(req:NextRequest, {params} : {params:{id:string}}) {
    try {
        const {id} = params;
        const vlog = await prisma.vlog.findFirst({where:{id}});
        if(!vlog)
            return NextResponse.json({message: "Vlog not found", status:404});

        const deletedVlog = await prisma.vlog.delete({where:{id}});
        return NextResponse.json({
            data:deletedVlog,
            message: "Vlog deleted successfully",
            success: true,
        },{status:200})

    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching vlog: " + message, {
            status: 500
        });
    }
}