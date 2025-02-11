// File: src/app/admin/api/predict/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";
import { predictCrisis } from "@/utils/predictCrisis";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  // Authenticate the user
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }

  try {
    // Step 1: Fetch all incident_ids that already have predictions
    const predictedIncidents = await prisma.prediction.findMany({
      select: { incident_id: true },
    });
    const predictedIdsSet = new Set(
      predictedIncidents.map((p) => p.incident_id)
    );

    // Step 2: Fetch all incidents without predictions
    const incidentsWithoutPredictions = await prisma.incident.findMany({
      where: {
        incident_id: { notIn: Array.from(predictedIdsSet) },
        description: { not: "" },
      },
    });

    if (incidentsWithoutPredictions.length === 0) {
      return NextResponse.json(
        { message: "No incidents require prediction." },
        { status: 200 }
      );
    }

    // Step 3: Predict and insert predictions
    const predictionPromises = incidentsWithoutPredictions.map(
      async (incident) => {
        const predictedCrisis = predictCrisis(incident.description);

        try {
          await prisma.prediction.create({
            data: {
              incident_id: incident.incident_id,
              prediction: predictedCrisis,
            },
          });
          console.log(
            `Prediction for incident_id ${incident.incident_id}: ${predictedCrisis}`
          );
        } catch (error: unknown) {
          if ((error as Prisma.PrismaClientKnownRequestError).code === "P2002") {
            // Unique constraint failed
            console.warn(
              `Prediction for incident_id ${incident.incident_id} already exists.`
            );
          } else {
            console.error(
              `Error inserting prediction for incident_id ${incident.incident_id}:`,
              error
            );
          }
        }
      }
    );

    await Promise.all(predictionPromises);

    return NextResponse.json(
      {
        message: "Predictions processed successfully.",
        processedCount: incidentsWithoutPredictions.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /admin/api/predict:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Authenticate the user
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }

  try {
    const url = new URL(request.url);
    const incidentId = url.searchParams.get("incidentId");

    if (!incidentId) {
      return NextResponse.json(
        { error: "incidentId is required." },
        { status: 400 }
      );
    }

    const prediction = await prisma.prediction.findUnique({
      where: { incident_id: incidentId },
    });

    if (prediction) {
      return NextResponse.json(
        { prediction: prediction.prediction },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Prediction not yet available." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error in GET /admin/api/predict:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
