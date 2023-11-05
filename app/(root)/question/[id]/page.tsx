import Answers from '@/components/forms/Answers'
import AllAnswers from '@/components/shared/AllAnswers'
import Metric from '@/components/shared/Metric'
import ParsehTML from '@/components/shared/ParsehTML'
import RenderTags from '@/components/shared/RenderTags'
import Votes from '@/components/shared/Votes'
import { getQuestionById } from '@/lib/actions/question.action'
import { getUserById } from '@/lib/actions/user.action'
import { getTimeStamp } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async ({ params, searchParams }: any) => {
  const result = await getQuestionById({ questionId: params.id })
  const { userId: clerkId } = auth()

  let mongoUser

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId })
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
          <Link href={`/profile/${result.author.clerkId}`} className='flex items-center justify-start gap-1'>
            <Image src={result.author.picture} className='rounded-full' height={22} width={22} alt='profile' />
            <p >
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes type="Question" itemId={JSON.stringify(result._id)} userId={JSON.stringify(mongoUser._id)} upvotes={result.upvotes.length} hasupVoted={result.upvotes.includes(mongoUser._id)} downVotes={result.downvotes.length} hasdownVoted={result.downvotes.includes(mongoUser._id)} hasSaved={mongoUser?.saved.includes(result._id)} />
          </div>
        </div>
        <h2 className='font-semibold text-left mt-3.5 text-2xl w-full'>
          {result.title}
        </h2>
      </div>

      <div className='mb-8 mt-5 flex flex-wrap gap-4'>
        <Metric
          imgUrl={"/images/clock.svg"}
          alt="clock"
          value={`asked ${getTimeStamp(result.createdAt)}`}
          title="Asked"
          textStyles={"font-medium flex  text-black dark:text-gray-300 "}
          isAuthor={false}
        />
        <Metric
          imgUrl={"/images/message-circle.svg"}
          alt="message"
          value={result.answers.length}
          title="Answers"
          textStyles={"font-medium flex  text-black dark:text-gray-300 "}
          isAuthor={false}
        />
        <Metric
          imgUrl={"/images/eye.svg"}
          alt="eye"
          value={result.views}
          title="Views"
          textStyles={"font-medium flex  text-black dark:text-gray-300 "}
          isAuthor={false}
        />
      </div>

      <ParsehTML data={result.content} />
      <div className='mt-8 flex flex-wrap gap-2'>
        {result.tags.map((tag: any) => (
          <RenderTags key={tag._id} _id={tag._id} name={tag.name} showCount={false} />
        ))}
      </div>

      <AllAnswers questionId={result._id} userId={JSON.stringify(mongoUser._id)} totalAnswers={result.answers.length} />

      <Answers question={result.content} questionId={JSON.stringify(result._id)} authorId={JSON.stringify(mongoUser._id)} />
    </>
  )
}

export default page
