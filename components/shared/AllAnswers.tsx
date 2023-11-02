import React from 'react'
import Filters from './Filters'
import { AnswersFilters } from '@/constants/filters'
import { getAllAnswers } from '@/lib/actions/answer.action'
import Link from 'next/link'
import Image from 'next/image'
import { getTimeStamp } from '@/lib/utils'
import ParsehTML from './ParsehTML'
import Votes from './Votes'

type Props = {
  questionId: string
  userId: string
  totalAnswers: number
  page?: number
  filter?: number
}

const AllAnswers = async ({ questionId, totalAnswers, userId, page, filter }: Props) => {
  const result = await getAllAnswers({ questionId })
  console.log(result)
  return (
    <div className='mt-11'>
      <div className='flex items-center justify-between'>
        <h1 className='text-primary-500'>{totalAnswers} answers </h1>
        <Filters filters={AnswersFilters} />
      </div>
      <div>
        {result?.answers.map((answer) => (
   <article key={answer._id} className='flex flex-col  justify-between'>
   <div className='mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
     <Link href={`/profile/${answer.author.clerkId}`} className='flex flex-1 items-start gap-1 sm:items-center'>
       <Image src={answer.author.picture} width={18} height={18} alt="profile" className="rounded-full object-cover max-sm:mt-0.5" />
       <div className='flex flex-col sm:flex-row sm:items-center'>
         <p className='font-semibold '>
           {answer.author.name}
         </p>
         <p> {" "} - <span className='max-sm:hidden'>
           answered {" "}   </span>
           {getTimeStamp(answer.createdAt)}
         </p>
       </div>
     </Link>
     <div className="flex justify-end">
       <Votes />
     </div>
   </div>
   <div>
     <ParsehTML data={answer.content} />
   </div>
 </article>
 
   
     
        ))}
      </div>
    </div>
  )
}

export default AllAnswers
