"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: any) {
  try {
    await connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllAnswers(params: any) {
  try {
    await connectToDatabase();
    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
  }
}

export async function upvoteAnswer(params: any) {
  await connectToDatabase();
  const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

  let updateQuery = {};
  if (hasupVoted) {
    updateQuery = { $pull: { upvotes: userId } };
  } else if (hasdownVoted) {
    updateQuery = { $pull: { downvotes: userId }, $push: { upvotes: userId } };
  } else {
    updateQuery = { $addToSet: { upvotes: userId } };
  }
  const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
    new: true,
  });
  if (!answer) throw new Error("answer not found");

  revalidatePath(path);
}

export async function downVotesAnswer(params: any) {
  await connectToDatabase();
  const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

  let updateQuery = {};
  if (hasdownVoted) {
    updateQuery = { $pull: { downvotes: userId } };
  } else if (hasupVoted) {
    updateQuery = { $pull: { upvotes: userId }, $push: { downvotes: userId } };
  } else {
    updateQuery = { $addToSet: { downvotes: userId } };
  }
  const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
    new: true,
  });
  if (!answer) throw new Error("answer not found");

  revalidatePath(path);
}
