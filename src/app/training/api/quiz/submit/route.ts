import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const { total, correct, wrong } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await prisma.quizStat.create({
      data: { userId, total, correct, wrong },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error submitting quiz results:", error);
    return NextResponse.json(
      { error: "Failed to submit quiz results" },
      { status: 500 }
    );
  }
}
