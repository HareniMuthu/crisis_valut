import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    // Parse the JSON request body
    const { name, contactInfo, description } = await request.json();

    // Validate that all required fields are provided
    if (!name || !contactInfo || !description) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Insert the new submission into the database
    const newSubmission = await prisma.contactUs.create({
      data: {
        name,
        contactInfo,
        description,
      },
    });

    // Return the created submission as a response
    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error("Error in POST /contactus/api:", error);
    return NextResponse.json(
      { error: "Failed to create contact submission." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch all contact submissions from the database
    const submissions = await prisma.contactUs.findMany({
      orderBy: { id: "desc" }, // Sort submissions by newest first
    });

    // Return the fetched submissions
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error("Error in GET /contactus/api:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact submissions." },
      { status: 500 }
    );
  }
}
