"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tags.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions() {
  try {
    await connectToDatabase();
    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    return { questions };
  } catch (error) {
    console.log(error, "error getting questions");
  }
}

export async function createQuestion(params: any) {
  try {
    await connectToDatabase();
    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagsDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagsDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagsDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error, "error creating question");
  }
}

export async function getQuestionById(params: any) {
  try {
    await connectToDatabase();
    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
  }
}

export async function upvoteQuestion(params: any) {
  await connectToDatabase();
  const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

  let updateQuery = {};
  if (hasupVoted) {
    updateQuery = { $pull: { upvotes: userId } };
  } else if (hasdownVoted) {
    updateQuery = { $pull: { downvotes: userId }, $push: { upvotes: userId } };
  } else {
    updateQuery = { $addToSet: { upvotes: userId } };
  }
  const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
    new: true,
  });
  if (!question) throw new Error("Question not found");

  revalidatePath(path);
}
export async function downVotesQuestion(params: any) {
  await connectToDatabase();
  const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

  let updateQuery = {};
  if (hasdownVoted) {
    updateQuery = { $pull: { downvotes: userId } };
  } else if (hasupVoted) {
    updateQuery = { $pull: { upvotes: userId }, $push: { downvotes: userId } };
  } else {
    updateQuery = { $addToSet: { downvotes: userId } };
  }
  const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
    new: true,
  });
  if (!question) throw new Error("Question not found");

  revalidatePath(path);
}
