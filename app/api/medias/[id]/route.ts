import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";

export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const {id} = params;
        const media = await prisma.media.findFirst({where: {id}});
        if(!media)
            return NextResponse.json({message: "Media not found"},{status:404});

        return NextResponse.json({
            data:media,
            message: "Media fetching successfully",
            success: true,
        },{status:200})
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching media: " + message, {
            status: 500
        });
    }
}

export async function PUT(req:NextRequest, {params} : {params: {id:string}}) {
    try {
        const {id} = params;
        const media = await prisma.media.findFirst({where:{id}});
        if(!media)
            return NextResponse.json({ message: "Media not found", success: false }, { status: 404 });
        const body = await req.json();
        const updatedMedia = await prisma.media.update({
            where: {id},
            data: {
                pro_name_En: body.pro_name_En,
                pro_name_Km: body.pro_name_Km,
                video_url: body.video_url
            }
        });
        return NextResponse.json({
            data:updatedMedia,
            message: "Media updated successfully",
            success: true,
        }, {status: 200});
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching media: " + message, {
            status: 500
        });
    }
}

export async function DELETE(req:NextRequest, {params} : {params:{id:string}}) {
    try {
        const {id} = params;
        const media = await prisma.media.findFirst({where:{id}});
        if(!media)
            return NextResponse.json({message: "Media not found", status:404});

        const deletedMedia = await prisma.media.delete({where:{id}});
        return NextResponse.json({
            data:deletedMedia,
            message: "Media deleted successfully",
            success: true,
        },{status:200})

    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching media: " + message, {
            status: 500
        });
    }
}