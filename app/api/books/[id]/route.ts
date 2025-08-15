import { generateSlug } from "@/utils/generateSlug";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

// 🟢 GET a single book
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) {
      return NextResponse.json({ message: "Book not found", success: false }, { status: 404 });
    }

    return NextResponse.json({
      data: book,
      message: "Book fetched successfully",
      success: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, message: "Error fetching book", error: message }, { status: 500 });
  }
}

// 🟢 UPDATE a book
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const existingBook = await prisma.book.findUnique({ where: { id } });
    if (!existingBook) {
      return NextResponse.json({ message: "Book not found", success: false }, { status: 404 });
    }

    const body = await req.json();

    const baseSlug = generateSlug(body.nameEn);
    let slug = `${baseSlug}-v${body.versionId}`;
    let counter = 1;

    // ✅ Ensure slug unique within same versionId (excluding current book)
    while (
      await prisma.book.findFirst({
        where: {
          slug,
          versionId: body.versionId,
          NOT: { id },
        },
      })
    ) {
      slug = `${baseSlug}-v${body.versionId}-${counter}`;
      counter++;
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        nameEn: body.nameEn,
        nameKm: body.nameKm,
        slug,
        versionId: body.versionId,
      },
    });

    return NextResponse.json({
      data: updatedBook,
      message: "Book updated successfully",
      success: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, message: "Error updating book", error: message }, { status: 500 });
  }
}

// 🟢 DELETE a book
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const existingBook = await prisma.book.findUnique({ where: { id } });
    if (!existingBook) {
      return NextResponse.json({ message: "Book not found", success: false }, { status: 404 });
    }

    const deletedBook = await prisma.book.delete({ where: { id } });

    return NextResponse.json({
      data: deletedBook,
      message: "Book deleted successfully",
      success: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, message: "Error deleting book", error: message }, { status: 500 });
  }
}
