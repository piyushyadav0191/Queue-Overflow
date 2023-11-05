import Image from 'next/image'
import React from 'react'

const StatsCard = ({ imgUrl, value, title }: { imgUrl: string, value: number, title: string }) => {
  return (
    <div className="flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt={title} width={50} height={50} />
      <div>
        <p className="font-semibold text-xl">{value} </p>
        <p className="font-medium text-2l">{title} </p>
      </div>
    </div>
  )
}

type Props = {
  totalQuestion: number | undefined
  totalAnswer: number | undefined
}

const Stats = ({ totalAnswer, totalQuestion }: Props) => {
  return (
    <div>
      <h1 className='text-2xl font-bold mt-3'>Stats</h1>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-1 md:grid-cols-4">
        <div className="flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="font-semibold text-xl">{totalQuestion} </p>
            <p className="font-medium text-2l">Questions </p>
          </div>
          <div>
            <p className="font-semibold text-xl">{totalAnswer} </p>
            <p className="font-medium text-2l">Answers </p>
          </div>
        </div>
        <StatsCard imgUrl={"/images/gold-mdedal.svg"} value={0} title="Gold badges" />
        <StatsCard imgUrl={"/images/silver-mdedal.svg"} value={0} title="Silver badges" />
        <StatsCard imgUrl={"/images/bronze-mdedal.svg"} value={0} title="Bronze badges" />
      </div>
    </div>
  )
}

export default Stats
