import Metric from '@/components/shared/Metric'
import ParsehTML from '@/components/shared/ParsehTML'
import RenderTags from '@/components/shared/RenderTags'
import { getQuestionById } from '@/lib/actions/question.action'
import { getTimeStamp } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async ({params, searchParams}) => {
  const result = await getQuestionById({questionId: params.id})
  console.log(result)
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
          Voting
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
      {result.tags.map((tag) => (
        <RenderTags key={tag._id} _id={tag._id} name={tag.name} showCount={false} />
      ))}
    </div>
    </>
  )
}

export default page
