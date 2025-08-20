import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
// import { generateSlug } from "@/utils/generateSlug";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const version = await prisma.version.findFirst({ where: { id } });

    if (!version) {
      return NextResponse.json({ message: "Version not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        data: version,
        message: "Version fetching successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new NextResponse("Error in fetching Versions: " + message, {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const version = await prisma.version.findFirst({ where: { id } });

    if (!version) {
      return NextResponse.json({ message: "Version not found", success: false }, { status: 404 });
    }

    const body = await req.json();

    // ❌ Do not touch slug when updating
    const updatedVersion = await prisma.version.update({
      where: { id },
      data: {
        titleEn: body.titleEn,
        titleKm: body.titleKm,
        // slug is left unchanged
      },
    });

    return NextResponse.json(
      {
        data: updatedVersion,
        message: "Version updated successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new NextResponse("Error in updating Versions: " + message, {
      status: 500,
    });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const version = await prisma.version.findFirst({ where: { id } });

    if (!version) {
      return NextResponse.json({ message: "Version not found" }, { status: 404 });
    }

    const deletedVersion = await prisma.version.delete({ where: { id } });
    return NextResponse.json(
      {
        data: deletedVersion,
        message: "Version deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new NextResponse("Error in deleting Versions: " + message, {
      status: 500,
    });
  }
}
