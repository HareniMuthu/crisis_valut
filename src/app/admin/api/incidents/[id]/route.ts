import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma"; // Adjust the path to your Prisma client
import { getAuth } from "@clerk/nextjs/server";

// PATCH handler for updating incident status
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // `params` is now a `Promise`, so we need to await it
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Incident ID is required." },
        { status: 400 }
      );
    }

    // Authenticate user (optional admin check)
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    // Parse the request body
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ["NOT_VIEWED", "VIEWED", "ACTION_TAKEN"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status provided." },
        { status: 400 }
      );
    }

    // Update the incident in the database
    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedIncident, { status: 200 });
  } catch (error) {
    console.error("Error updating incident:", error);
    return NextResponse.json(
      { error: "Failed to update incident status." },
      { status: 500 }
    );
  }
}
