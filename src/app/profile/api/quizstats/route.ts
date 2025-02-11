// File: app/profile/api/quizstats/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request); // Pass request to getAuth

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const quizStats = await prisma.quizStat.findMany({
      where: { userId },
      orderBy: { timestamp: "desc" }, // Fetch latest stats first
    });

    // Transform data for chart rendering
    const totalQuestions = quizStats.map((stat) => stat.total);
    const correctAnswers = quizStats.map((stat) => stat.correct);
    const wrongAnswers = quizStats.map((stat) => stat.wrong);

    return NextResponse.json(
      { totalQuestions, correctAnswers, wrongAnswers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching quiz stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz statistics." },
      { status: 500 }
    );
  }
}
