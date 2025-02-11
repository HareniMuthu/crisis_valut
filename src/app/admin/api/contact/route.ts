import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    // Fetch all contact submissions
    const submissions = await prisma.contactUs.findMany({
      orderBy: { id: "desc" }, // Most recent submissions first
    });

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact submissions." },
      { status: 500 }
    );
  }
}
