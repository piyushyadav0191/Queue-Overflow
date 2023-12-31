import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tags.model";
import { ITag } from "@/database/tags.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getTopInteractedTags(params: any) {
  try {
    await connectToDatabase();

    const { userId, limit = 3 } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTags(params: any) {
  try {
    await connectToDatabase();
    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    if (filter === "popular") {
      sortOptions = { quesitons: -1 };
    } else if (filter === "recent") {
      sortOptions = { createdAt: -1 };
    } else if (filter === "name") {
      sortOptions = { name: 1 };
    } else if (filter === "old") {
      sortOptions = { createdAt: 1 };
    }

    const tags = await Tag.find(query).sort(sortOptions);
    return { tags };
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestionByTagID(params: any) {
  try {
    await connectToDatabase();
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id name clerkId picture" },
      ],
    });
    if (!tag) {
      throw new Error("tag not found");
    }

    const questions = tag.questions;
    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
  }
}

export async function getTopPopularTags() {
  try {
    await connectToDatabase();
    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return popularTags;
  } catch (error) {
    console.log(error);
  }
}
