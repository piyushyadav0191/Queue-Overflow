import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tags.model";

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
  await connectToDatabase()
  const tags = await Tag.find({})
  return {tags}

} catch (error) {
  console.log(error)
}

}
