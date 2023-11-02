"use client"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnswersSchema } from "@/lib/validations"
import { Editor } from "@tinymce/tinymce-react"
import { useRef, useState } from "react"
import { createAnswer } from "@/lib/actions/answer.action"
import { usePathname } from "next/navigation"

type Props = {
  questionId: string
  authorId: string
  question: string
}

const Answers = ({ authorId, question, questionId }: Props) => {
  const pathname = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const editorRef = useRef(null)
  const form = useForm<z.infer<typeof AnswersSchema>>({
    resolver: zodResolver(AnswersSchema),
    defaultValues: {
      answer: "",
    },
  })

  async function handleCreateAnswer(values: z.infer<typeof AnswersSchema>) {
    setIsSubmitting(true)
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname
      })

      form.reset()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 mt-3">
        <h4 className="font-semibold">Write your answer</h4>
        <Button onClick={() => { }} className="gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500">
          Generate an AI Answer
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateAnswer)} className="mt-6 flex w-full flex-col gap-10">
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full gap-3 flex-col">

                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYCLOUD_API_KEY}
                    //@ts-ignore
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins:
                        "  mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                      toolbar:
                        "undo redo | codesample |  blocks fontfamily fontsize | bold italic underline strikethrough | link  mergetags | align lineheight |  | checklist numlist bullist indent outdent | emoticons charmap ",
                      content_style: "body { font-family:Inter; font-size:16px }",
                      skin: 'oxide-dark',
                      content_css: 'dark'
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="bg-primary-500 w-fit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting" : "Submit"}
            </Button>

          </div>
        </form>
      </Form>
    </div>
  )
}

export default Answers
