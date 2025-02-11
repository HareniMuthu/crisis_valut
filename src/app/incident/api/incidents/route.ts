// File: incident/api/incident/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; // Adjust this path to match your folder structure
import { getAuth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid"; // Importing uuid

// POST: Create a new incident
export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user ID
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access. Please log in to continue." },
        { status: 401 }
      );
    }

    // Parse the request body
    const data = await request.json();
    const { title, type, date, severity, location, description } = data;

    // Validate the input
    if (!title || !type || !date || !severity || !location || !description) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Generate a unique incident_id
    const incident_id = `INC-${uuidv4().split("-")[0].toUpperCase()}`;

    // Create the new incident in the database with status set to NOT_VIEWED
    const newIncident = await prisma.incident.create({
      data: {
        userId,
        title,
        type,
        date: new Date(date),
        severity,
        location,
        description,
        attachments: [], // Assuming attachments are not implemented yet
        status: "NOT_VIEWED", // Set initial status
        incident_id, // Include the generated incident_id
      },
    });

    // Return the created incident
    return NextResponse.json(newIncident, { status: 201 });
  } catch (error) {
    console.error("Error in POST /incident/api/incidents:", error);
    return NextResponse.json(
      { error: "Failed to create the incident." },
      { status: 500 }
    );
  }
}

// GET: Retrieve incidents for a specific user
export async function GET(request: NextRequest) {
  try {
    // Get the authenticated user ID
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access. Please log in to continue." },
        { status: 401 }
      );
    }

    console.log("Fetching incidents for userId:", userId);

    // Fetch incidents for the authenticated user
    const incidents = await prisma.incident.findMany({
      where: { userId },
      orderBy: { date: "desc" }, // Order by date, descending
      select: {
        id: true,
        incident_id: true, // Include incident_id
        title: true,
        type: true,
        date: true,
        severity: true,
        location: true,
        description: true,
        status: true, // Include status in the response
      },
    });

    console.log("Fetched incidents:", incidents);

    // Return the fetched incidents
    return NextResponse.json(incidents, { status: 200 });
  } catch (error) {
    console.error("Error in GET /incident/api/incidents:", error);
    return NextResponse.json(
      { error: "Failed to fetch incidents." },
      { status: 500 }
    );
  }
}
