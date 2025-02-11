// File: app/profile/api/incidents/route.ts

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request); // Pass request to getAuth

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const incidents = await prisma.incident.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    const response = incidents.map((incident) => ({
      id: incident.id,
      incident_id: incident.incident_id,
      userId: incident.userId,
      title: incident.title,
      type: incident.type,
      date: incident.date.toISOString(),
      severity: incident.severity,
      location: incident.location,
      description: incident.description,
      status: incident.status,
    }));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return NextResponse.json(
      { error: "Failed to fetch incidents." },
      { status: 500 }
    );
  }
}
