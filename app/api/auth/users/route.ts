import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import bcrypt from "bcryptjs";
// import {createEmailVerificationToken} from "@/lib/emailVerification";
// import sendVerificationEmail from "@/lib/sendVerificationEmail";

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

      // Fetch users with pagination and sorting
      const users = await prisma.user.findMany({
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

      // Return paginated response
      return NextResponse.json(
          {
              data: users,
              message: 'Successfully retrieved users',
              pagination
          },
          { status: 200 }
      );
  }catch(error){
    const message = error instanceof Error ? error.message : String(error);
    return new NextResponse("Error in fetching Users: " + message, {
      status:500
    });
  }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Check if username or email is already taken
        const existingUsers = await prisma.user.findFirst({
            where: { OR: [ { username: body.username }, { email: body.email } ] }
        });

        if (existingUsers) {
            return NextResponse.json(
                { message: "Username or email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPasswords = await bcrypt.hash(body.password, 10);

        // Create new user
        const user = await prisma.user.create({
            data: {
                username:body.username,
                email:body.email,
                role:body.role,
                profile:body.profile,
                password: hashedPasswords,
                isVerifyEmail: false,
            },
        });

        // Create email verification token & send email
        // const token = await createEmailVerificationToken(user.id);
        // await sendVerificationEmail(user.email, token.token); 

        return NextResponse.json(
            {
                data: user,
                message: "Registration successful! Please check your email to verify your account."},
            { status: 201 }
        );
    } catch (error) {
        console.error("User creation failed:", error);
        return NextResponse.json(
            { message: "Failed to register user. Please try again later." },
            { status: 500 }
        );
    }
}
