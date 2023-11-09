"use client"
import React, { useEffect } from 'react'
import { ReloadIcon } from "@radix-ui/react-icons"
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import GlobalFilters from './GlobalFilters'
import { globalSearch } from '@/lib/actions/general.action'

type Props = {}

const GlobalResult = (props: Props) => {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = React.useState(false)
  const [result, setResult] = React.useState([])

  const global = searchParams.get("global")
  const type = searchParams.get("type")

  useEffect(() => {
    const fetchResults = async () => {
      setResult([])
      setIsLoading(true)
      try {
        const res = await globalSearch({ query: global, type })

        setResult(JSON.parse(res))
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }
    if (global) {
      fetchResults()
    }

  }, [global, type])

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case 'user':
        return `/profile/${id}`
      case 'question':
        return `/question/${id}`
      case 'answer':
        return `/question/${id}`
      case 'tag':
        return `/tag/${id}`
      default:
        return '/'
    }
  }

  return (
    <div className='absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400'>
      <GlobalFilters />
      <div className='my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50' />
      <div className="space-y-5">
        <p className='ml-4 px-2 font-bold'>
          Top match
        </p>
        {isLoading ? (
          <div className='flex justify-center items-center flex-col px-5'>
            <ReloadIcon className='my-2 h-10 w-10 text-primary-500 animate-spin' />
            <p>Browsing the entire server and database</p>
          </div>
        ) : (
          <div className='flex flex-col  gap-2'>
            {result.length > 0 ? (
              result?.map((item: any, index: number) => (
                <Link href={renderLink(item.type, item.id)} key={item.type + item.id + index} className='flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:bg-dark-500/50 '>
                  <Image src={"/images/tag.svg"} alt='tags' width={18} height={18} className='text-black dark:text-white mt-1 object-contain' />
                  <div className="flex flex-col">
                    <p className='font-medium line-clamp-1 '>
                      {item.title}
                    </p>
                    <p>
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className='flex justify-center items-center flex-col'>
                <p className='px-5 py-2.5'>No result found</p>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}

export default GlobalResult
