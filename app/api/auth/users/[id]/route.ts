import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";

export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const {id} = params;
        const user = await prisma.user.findFirst({where: {id}});
        if(!user)
            return NextResponse.json({message: "User not found"},{status:404});

        return NextResponse.json({
            data:user,
            message: "User fetching successfully",
            success: true,
        },{status:200})

    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching User: " + message, {
            status: 500
        });
    }
}

export async function PUT(req:NextRequest, {params} : {params: {id:string}}) {
    try {
        const {id} = params;
        const user = await prisma.user.findFirst({where:{id}});
        if(!user)
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        const body = await req.json();
        const updatedUser = await prisma.user.update({
            where: {id},
            data: {
                username:body.username,
                email:body.email,
                profile:body.profile,
                isVerifyEmail:true
            }
        });
        return NextResponse.json({
            data:updatedUser,
            message: "User updated successfully",
            success: true,
        }, {status: 200});
    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching User: " + message, {
            status: 500
        });
    }
}

export async function DELETE(req:NextRequest, {params} : {params:{id:string}}) {
    try {
        const {id} = params;
        const user = await prisma.user.findFirst({where:{id}});
        if(!user)
            return NextResponse.json({message: "User not found", status:404});

        const deletedUser = await prisma.user.delete({where:{id}});
        return NextResponse.json({
            data:deletedUser,
            message: "User deleted successfully",
            success: true,
        },{status:200})

    }catch (error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching User: " + message, {
            status: 500
        });
    }
}