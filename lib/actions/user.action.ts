"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tags.model";
import { FilterQuery } from "mongoose";
import Answer from "@/database/answer.model";
import { assignBadges } from "../utils";

export async function getAllUsers(params: any) {
  try {
    await connectToDatabase();
    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "newuser":
        sortOptions = { joinedAt: -1 };
        break;
      case "oldusers":
        sortOptions = { joinedAt: 1 };
        break;
      case "topcontributers":
        sortOptions = { reputation: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const users = await User.find(query).sort(sortOptions);
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

    let sortOptions = {};

    switch (filter) {
      case "mostrecent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "mostvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "mostviewed":
        sortOptions = { views: -1 };
        break;
      case "mostanswered":
        sortOptions = { answers: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
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

export async function getUserInfo(params: any) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new Error("User not found");
    }
    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    const [questionUpvotes] = await Question.aggregate([
      { $match: { author: user._id } },
      { $project: { _id: 0, upvotes: { $size: "$upvotes" } } },
      { $group: { _id: null, totalUpvotes: { $sum: "$upvotes" } } },
    ]);
    const [answerUpvotes] = await Answer.aggregate([
      { $match: { author: user._id } },
      { $project: { _id: 0, upvotes: { $size: "$upvotes" } } },
      { $group: { _id: null, totalUpvotes: { $sum: "$upvotes" } } },
    ]);
    const [questionViews] = await Answer.aggregate([
      { $match: { author: user._id } },
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);

    const criteria = [
      { type: "QUESTION_COUNT", count: totalQuestions },
      { type: "ANSWER_COUNT", count: totalAnswers },
      { type: "QUESTION_UPVOTES", count: questionUpvotes?.totalUpvotes || 0 },
      { type: "ANSWER_UPVOTES", count: answerUpvotes?.totalUpvotes || 0 },
      { type: "TOTAL_VIEWS", count: questionViews?.totalViews || 0 },
    ];

    const badgeCounts = assignBadges({ criteria });

    return {
      user,
      totalQuestions,
      totalAnswers,
      badgeCounts,
      reputation: user.reputation,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getUserQuestion(params: any) {
  try {
    await connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const totalQuestions = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
      .sort({ createdAt: -1, views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id name clerkId picture");

    return { questions: userQuestions, totalQuestions };
  } catch (error) {
    console.log(error);
  }
}

export async function getUserAnswers(params: any) {
  try {
    await connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id name clerkId picture");

    return { answers: userAnswers, totalAnswers };
  } catch (error) {
    console.log(error);
  }
}

export async function getHotQuestions() {
  try {
    await connectToDatabase();
    const hotQuestions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);

    return hotQuestions;
  } catch (error) {
    console.log(error);
  }
}
