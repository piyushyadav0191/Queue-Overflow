import AnswersTab from '@/components/shared/AnswersTab'
import ProfileLink from '@/components/shared/ProfileLink'
import QuestionTab from '@/components/shared/QuestionTab'
import Stats from '@/components/shared/Stats'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { getUserInfo } from '@/lib/actions/user.action'
import { getJoinedDate } from '@/lib/utils'
import { SignedIn, auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: {
    id: string
  }
  searchParams: string
}

const page = async ({ params: { id }, searchParams }: Props) => {
  const { userId: clerkId } = auth()
  const userInfo = await getUserInfo({ userId: id })

  return (
    <>
      <div className='flex flex-col-reverse items-start justify-between sm:flex-row'>
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image src={userInfo?.user.picture} alt="profile" width={140} height={140} className="rounded-full object-cover" />
          <div className="mt-3">
            <h1 className="font-bold text-2xl">{userInfo?.user.name} </h1>
            <p className='font-regular text-light-400'>@{userInfo?.user.username} </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo?.user.portfolioWebsite && (
                <ProfileLink imgUrl="/images/website.svg" href={userInfo?.user.portfolioWebsite} title="Portfolio" />
              )}
              {userInfo?.user.location && (
                <ProfileLink imgUrl="/images/location.svg" title={userInfo?.user.location} />
              )}
              <ProfileLink imgUrl="/images/calendar.svg" title={getJoinedDate(userInfo?.user.joinedAt.toString())} />

              {userInfo?.user.bio && (
                <p className=" text-xl font-semibold">{userInfo?.user.bio} </p>
              )}
            </div>
          </div>
        </div>
        <div className='flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3'>
          <SignedIn>
            {clerkId === userInfo?.user.clerkId && (
              <Link href={"/profile/edit"}>
                <Button className="min-h-[45px] px-4 py-3 bg-primary-500 text-black ">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats totalQuestion={userInfo?.totalQuestions} totalAnswer={userInfo?.totalAnswers} />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className='min-h-[42px] p-1'>
            <TabsTrigger value="top-posts" className='tab'>
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">Answers</TabsTrigger>
          </TabsList>
          <TabsContent value='top-posts'>
            <QuestionTab searchParams={searchParams} userId={userInfo?.user?._id} clerkId={clerkId} />
          </TabsContent>
          <TabsContent value='answers'>
            <AnswersTab searchParams={searchParams} userId={userInfo?.user?._id} clerkId={clerkId} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default page
