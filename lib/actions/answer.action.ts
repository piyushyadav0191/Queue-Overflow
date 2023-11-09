"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tags.model";
import Interaction from "@/database/interaction.model";
import User from "@/database/user.model";

export async function createAnswer(params: any) {
  try {
    await connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });
    const questionObject = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    await Interaction.create({
      user: author,
      action: "answer",
      question,
      answer: newAnswer._id,
      tags: questionObject.tags,
    });

    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 } });

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

  await User.findByIdAndUpdate(userId, {
    $inc: { reputation: hasupVoted ? -2 : 2 },
  });
  await User.findByIdAndUpdate(answer.author, {
    $inc: { reputation: hasupVoted ? -10 : 10 },
  });
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

  await User.findByIdAndUpdate(userId, {
    $inc: { reputation: hasdownVoted ? -2 : 2 },
  });
  await User.findByIdAndUpdate(answer.author, {
    $inc: { reputation: hasdownVoted ? -10 : 10 },
  });

  revalidatePath(path);
}

export async function deleteAnswer(params: any) {
  try {
    await connectToDatabase();
    const { answersId, path } = params;

    const answer = await Answer.findById(answersId);

    if (!answer) throw new Error("Answer not found");

    await Answer.deleteOne({ _id: answersId });
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answersId } }
    );

    await Interaction.deleteMany({ answer: answersId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
