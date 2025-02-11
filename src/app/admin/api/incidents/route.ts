import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; // Adjust the path as needed
import { getAuth } from "@clerk/nextjs/server"; // Assuming you're using Clerk for auth

// GET: Fetch all incidents with chat messages and status
export async function GET(request: NextRequest) {
  try {
    // Optionally, restrict access to admins only
    const { userId } = getAuth(request);
    console.log(userId);

    // Fetch all incidents with related chat messages and status
    const incidents = await prisma.incident.findMany({
      orderBy: { date: "desc" },
      include: {
        chatMessages: {
          orderBy: { timestamp: "asc" },
        },
      },
    });

    return NextResponse.json(incidents, { status: 200 });
  } catch (error) {
    console.error("Error fetching incidents with chat messages:", error);

    // Return a proper error response
    return NextResponse.json(
      { error: "Failed to fetch incidents with chat messages." },
      { status: 500 }
    );
  }
}

// PATCH: Update the status of an incident
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // `params` is a Promise, so we need to await it
    const { id } = await context.params;

    // Optionally, verify admin privileges
    const { userId } = getAuth(request);
    console.log(userId);

    // Parse the request body
    const data = await request.json();
    const { status } = data;

    // Validate the new status
    if (!status || !["NOT_VIEWED", "VIEWED", "ACTION_TAKEN"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status provided." },
        { status: 400 }
      );
    }

    // Update the incident's status
    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedIncident, { status: 200 });
  } catch (error) {
    console.error("Error updating incident status:", error);
    return NextResponse.json(
      { error: "Failed to update incident status." },
      { status: 500 }
    );
  }
}
