import Question from '@/components/forms/Question'
import { getQuestionById } from '@/lib/actions/question.action'
import { getUserById } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

const page = async ({ params: { id } }: Props) => {
  const { userId } = auth()
  if (!userId) return null
  const mongoUser = await getUserById({ userId })
  const result = await getQuestionById({ questionId: id })
  return (
    <div>
      <h1 className='text-2xl font-bold'>Edit Question</h1>
      <div className="mt-9">
        <Question mongoUserId={mongoUser?._id} type="Edit" questionDetails={JSON.stringify(result)} />
      </div>
    </div>
  )
}

export default page
