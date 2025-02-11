// File: admin/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { incidentId, message, senderId } = await request.json();

    if (!incidentId || !message || !senderId) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Fetch the Incident to get its ObjectId
    const incident = await prisma.incident.findUnique({
      where: { incident_id: incidentId },
    });

    if (!incident) {
      return NextResponse.json(
        { error: `No incident found with incident_id: ${incidentId}` },
        { status: 404 }
      );
    }

    const newMessage = await prisma.chatMessage.create({
      data: {
        incidentId: incident.id, // Use the ObjectId here
        senderId, // Save the sender ID (can be "admin" or user ID)
        message,
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Error in POST /admin/api/chat:", error);
    return NextResponse.json(
      { error: "Failed to send the message." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const incidentId = searchParams.get("incidentId");

    if (!incidentId) {
      return NextResponse.json(
        { error: "incidentId is required." },
        { status: 400 }
      );
    }

    // Fetch the Incident to get its ObjectId
    const incident = await prisma.incident.findUnique({
      where: { incident_id: incidentId },
    });

    if (!incident) {
      return NextResponse.json(
        { error: `No incident found with incident_id: ${incidentId}` },
        { status: 404 }
      );
    }

    const messages = await prisma.chatMessage.findMany({
      where: { incidentId: incident.id }, // Use the ObjectId here
      orderBy: { timestamp: "asc" },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error in GET /admin/api/chat:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages." },
      { status: 500 }
    );
  }
}
