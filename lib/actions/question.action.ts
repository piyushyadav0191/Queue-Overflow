"use server";

import { connectToDatabase } from "../mongoose";

export async function createQuestion() {
  try {
    connectToDatabase();
  } catch (error) {
    console.log(error, "error creating question");
  }
}
