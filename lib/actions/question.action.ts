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

    const title = params.title;
    const content = params.content;
    const tags = params.tags;
    const author = params.author;
    const path = params.path;

    const tagsDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}`, "i") } },
        { $setOnInsert: { name: tag } },
        { upsert: true, new: true }
      );
      tagsDocuments.push(existingTag._id);
    }

    const question = await Question.create({
      title,
      content,
      tags: tagsDocuments,
      author,
      path,
    });

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagsDocuments } },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error, "error creating question");
  }
}

export async function getQuestionById(params: any){
  try {
    await connectToDatabase()
    const {questionId} = params
    const question = await Question.findById(questionId).populate({path: "tags", model: Tag, select: '_id name'}).populate({path: "author", model: User, select: '_id clerkId name picture'})

    return question
  } catch (error) {
    console.log(error)
  }
}
