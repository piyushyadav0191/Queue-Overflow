import * as z from "zod";
export const QuestionFormSchema = z.object({
  title: z.string().min(2).max(50),
  explanation: z.string().min(10).max(500),
  tags: z.array(z.string().min(1).max(50)),
});

export const AnswersSchema = z.object({
  answer: z.string().min(10),
});

export const profileSchema = z.object({
  username: z.string().min(2, "Username must be at least 3 characters").max(50),
  name: z.string().min(2, "Name must be at least 3 characters").max(50),
  location: z.string().max(50),
  portfolioWebsite: z.string().url(),
  bio: z.string().max(160),
});
