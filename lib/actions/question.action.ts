"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tags.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import { FilterQuery } from "mongoose";

export async function getQuestions(params: any) {
  try {
    await connectToDatabase();
    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort(sortOptions);
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

    await Interaction.create({
      user: author,
      action: "ask_question",
      question: question._id,
      tags: tagsDocuments,
    });

    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

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

  await User.findByIdAndUpdate(userId, {
    $inc: { reputation: hasupVoted ? -1 : 1 },
  });

  await User.findByIdAndUpdate(question.author, {
    $inc: { reputation: hasupVoted ? -10 : 10 },
  });

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

  await User.findByIdAndUpdate(userId, {
    $inc: { reputation: hasdownVoted ? -2 : 2 },
  });

  await User.findByIdAndUpdate(question.author, {
    $inc: { reputation: hasdownVoted ? -10 : 10 },
  });
  revalidatePath(path);
}

export async function deleteQuestion(params: any) {
  try {
    await connectToDatabase();
    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });

    await Answer.deleteMany({ question: questionId });

    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function editQuestion(params: any) {
  try {
    await connectToDatabase();
    const { questionId, path, title, content } = params;

    const question = await Question.findById(questionId).populate("tags");

    if (!question) throw new Error("Question not found");

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
