import { getUserAnswers } from '@/lib/actions/user.action'
import React from 'react'
import AnswersCard from '../cards/AnswersCard'

type Props = {
  searchParams: string
  userId: string
  clerkId: string | null
}

const AnswersTab = async ({ clerkId, searchParams, userId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: 1
  })
  return (
    <div>
      {result?.answers.map((answer) => (
        <AnswersCard
          key={answer._id}
          _id={answer._id}
          clerkId={clerkId}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}

    </div>
  )
}

export default AnswersTab
