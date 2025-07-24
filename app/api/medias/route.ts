import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import schema from "@/app/api/medias/schema";

export async function GET(req:NextRequest){
    try {
        // Extract and validate query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Validate page and limit
    if (isNaN(page) || page < 1) {
        return NextResponse.json(
            { message: 'Invalid page number' },
            { status: 400 }
        );
    }
    if (isNaN(limit) || limit < 1 || limit > 100) {
        return NextResponse.json(
            { message: 'Invalid limit value (must be between 1 and 100)' },
            { status: 400 }
        );
    }

    // Calculate pagination
    const totalUsers = await prisma.user.count();

    // Handle empty results
    if (totalUsers === 0) {
        return NextResponse.json(
            {
                data: [],
                message: 'No users found',
                pagination: {
                    totalUsers: 0,
                    totalPages: 0,
                    currentPage: page,
                    limit,
                    hasNextPage: false,
                    hasPrevPage: false,
                    nextPage: null,
                    prevPage: null,
                    serialNumberStartFrom: 0
                }
            },
            { status: 200 }
        );
    }

    const totalPages = Math.ceil(totalUsers / limit);
      const skip = (page - 1) * limit;

      // Validate page range
      if (page > totalPages) {
          return NextResponse.json(
              { message: `Page ${page} does not exist` },
              { status: 404 }
          );
      }

        const medias = await prisma.media.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: 'asc' }
        });
         // Calculate pagination metadata
      const pagination = {
        totalUsers,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
        serialNumberStartFrom: skip + 1
    };
        return NextResponse.json(
            {
                data: medias,
                message: "Successfully Getting Medias",
                pagination,
                status: 200
            },
            {status:200}
        )
    }catch(error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching Media: " + message, {
            status:500
        });
    }
}

export async function POST(req:NextRequest){
    try {
        const body = await req.json();
        const validation = schema.safeParse(body);

        if(!validation.success){
            return NextResponse.json(validation.error.message, {status:400});
        }

        const newMedia = await prisma.media.create({
            data:{
                pro_name_En: body.pro_name_En,
                pro_name_Km: body.pro_name_Km,
                video_url: body.video_url
            }
        });

        if(!newMedia){
            return NextResponse.json({
                message: "Failed to created media"
            },{status:500})
        }

        return NextResponse.json({
            data: newMedia,
            message: "Media Created Successfully",
            status: 200
        },{status:201});
    }catch(error){
        const message = error instanceof Error ? error.message : String(error);
        return new NextResponse("Error in fetching media: " + message, {status:500})
    }
}