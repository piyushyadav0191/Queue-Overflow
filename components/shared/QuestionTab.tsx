import { getUserQuestion } from '@/lib/actions/user.action'
import React from 'react'
import QuestionCard from '../cards/QuestionCard'

type Props = {
  searchParams: string
  userId: string
  clerkId: string | null
}

const QuestionTab = async ({ clerkId, searchParams, userId }: Props) => {
  const result = await getUserQuestion({
    userId,
    page: 1
  })
  return (
    <div>
      {result?.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes.length}
          views={question.views}
          createdAt={question.createdAt}
          answers={question.answers}
        />
      ))}
    </div>
  )
}

export default QuestionTab
