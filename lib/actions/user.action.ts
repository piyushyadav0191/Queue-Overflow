"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tags.model";
import { FilterQuery } from "mongoose";

export async function getAllUsers(params: any) {
  try {
    await connectToDatabase();
    // const {page =1, pageSize =20, filter, searchQuery} = params

    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
  } catch (error) {
    console.log(error, "error getting user by id");
  }
}
export async function getUserById(params: any) {
  try {
    await connectToDatabase();
    console.log(params.userId);
    const user = await User.findOne({ clerkId: params.userId });
    return user;
  } catch (error) {
    console.log(error, "error getting user by id");
  }
}

export async function createUser(params: any) {
  try {
    await connectToDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {
    console.log(error, "error getting user by id");
  }
}
export async function updateUser(params: any) {
  try {
    await connectToDatabase();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error, "error getting user by id");
  }
}
export async function deleteUser(params: any) {
  try {
    await connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );

    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deleteUser;
  } catch (error) {
    console.log(error, "error getting user by id");
  }
}

export async function toggleSaveQuestion(params: any) {
  try {
    await connectToDatabase();
    const { userId, questionId, path } = params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { saved: questionId },
        },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error, "error getting user by id");
  }
}

export async function getSavedQuestion(params: any) {
  try {
    await connectToDatabase();
    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id name clerkId picture" },
      ],
    });
    if (!user) {
      throw new Error("User not found");
    }

    const savedQuestion = user.saved;
    return { questions: savedQuestion };
  } catch (error) {
    console.log(error, "error getting user by id");
  }
}
