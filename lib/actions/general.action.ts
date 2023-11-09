"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tags.model";
import { Moirai_One } from "next/font/google";

const SearchableType = ["question", "user", "answer", "tag"];

export async function globalSearch(params: any) {
  try {
    await connectToDatabase();
    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndType = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];
    const typeLower = type?.toLowerCase();
    if (!typeLower || !SearchableType.includes(typeLower)) {
      for (const { model, searchField, type } of modelsAndType) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answer containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                ? item.question
                : item._id,
          }))
        );
      }
    } else {
      const moedlInfo = modelsAndType.find((item) => item.type === type);
      if (!moedlInfo) {
        console.log("Invalid search type");
      }
      const queryResults = await moedlInfo?.model
        .find({ [moedlInfo.searchField]: regexQuery })
        .limit(8);

      results = queryResults?.map((item: any) => ({
        title:
          type === "answer"
            ? `Answer containing ${query}`
            : item[moedlInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
            ? item.question
            : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(error);
  }
}
