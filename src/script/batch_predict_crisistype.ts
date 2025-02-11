// File: src/scripts/batchPredictCrisis.ts

import { PrismaClient } from "@prisma/client";
import { predictCrisis } from "@/utils/predictCrisis";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function batchPredict() {
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

    console.log(
      `Found ${incidentsWithoutPredictions.length} incidents without predictions.`
    );

    if (incidentsWithoutPredictions.length === 0) {
      console.log("No incidents require prediction.");
      return;
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
          if ((error as { code: string }).code === "P2002") {
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

    console.log("Batch predictions processed successfully.");
  } catch (error) {
    console.error("Error during batch prediction:", error);
  } finally {
    await prisma.$disconnect();
  }
}

batchPredict();
