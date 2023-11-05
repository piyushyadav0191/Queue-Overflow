"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: any) {
  try {
    await connectToDatabase();
    const { questionId, userId } = params;
    // update view count
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        question: questionId,
        action: "view",
      });

      if (existingInteraction) return console.log("user has already viewed");

      await Interaction.create({
        user: userId,
        question: questionId,
        action: "view",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
