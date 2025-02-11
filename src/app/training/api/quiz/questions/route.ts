import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const questions = await prisma.quizQuestion.findMany();
    const randomQuestions = questions
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    return NextResponse.json(randomQuestions);
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
