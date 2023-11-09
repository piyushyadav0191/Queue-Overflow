"use client"
import { downVotesAnswer, upvoteAnswer } from '@/lib/actions/answer.action'
import { viewQuestion } from '@/lib/actions/interaction.action'
import { downVotesQuestion, upvoteQuestion } from '@/lib/actions/question.action'
import { toggleSaveQuestion } from '@/lib/actions/user.action'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

type Props = {
  type: string
  itemId: string
  userId: string
  upvotes: number
  hasupVoted: boolean
  downVotes: number
  hasdownVoted: boolean
  hasSaved?: boolean
}

const Votes = ({ downVotes, hasdownVoted, hasupVoted, itemId, type, upvotes, userId, hasSaved }: Props) => {
  console.log(userId, "userid")
  const pathname = usePathname()
  const router = useRouter()

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname
    })
    return toast.success(`Question ${hasSaved ? "Unsaved" : "Saved"}   successfully`)
  }
  const handleVote = async (action: string) => {
    if (!userId) return toast.error("You need to login to vote")

    if (action === 'upvote') {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          path: pathname
        })
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          path: pathname
        })
      }
      return toast.info(`Upvoted ${hasupVoted ? "Removed" : "Successfully"}`)
    }
    if (action === 'downvote') {
      if (type === "Question") {
        await downVotesQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          path: pathname
        })
      }
    } else if (type === "Answer") {
      await downVotesAnswer({
        answerId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        hasdownVoted,
        path: pathname
      })
    }
    return toast.info(`Downvoted ${hasdownVoted ? "Remove" : "Successfully"}`)
  }

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : null,
    })
  }, [itemId, userId, pathname, router])

  return (
    <div className='flex gap-6'>
      <div className="flex justify-center gap-2.5">
        <div className="flex justify-center gap-1.5">
          <Image src={hasupVoted ? "/images/upvotes.svg" : "/images/upvote.svg"} height={18} width={18} alt='upvotes' className='cursor-pointer' onClick={() => { handleVote("upvote") }} />
          <div className='flex justify-center min-[18px] rounded-sm p-1'>
            <p className=''>
              {upvotes}
            </p>
          </div>
          <div className="flex justify-center gap-1.5">
            <Image src={hasupVoted ? "/images/downvotes.svg" : "/images/downvote.svg"} height={18} width={18} alt='downvotes' className='cursor-pointer' onClick={() => { handleVote("downvote") }} />
            <div className='flex justify-center min-[18px] rounded-sm p-1'>
              <p className=''>
                {downVotes}
              </p>
            </div>
          </div>
        </div>
        {type === "Question" && <Image src={hasSaved ? "/images/star-filled.svg" : "/images/star.svg"} width={20} height={20} className='cursor-pointer' onClick={handleSave} alt='star' />}
      </div>
    </div>
  )
}

export default Votes
