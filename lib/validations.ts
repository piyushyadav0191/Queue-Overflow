import * as z from "zod";
export const QuestionFormSchema = z.object({
  title: z.string().min(2).max(50),
  explanation: z.string().min(20).max(500),
  tags: z.array(z.string().min(1).max(50)),
});
