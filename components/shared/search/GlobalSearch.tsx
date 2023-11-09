"use client"
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeyFromUrl } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import GlobalResult from "./GlobalResult";

type Props = {};

const GlobalSearch = (props: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  const [search, setSearch] = React.useState(query || '')
  const [isOpen, setIsOpen] = React.useState(false)
  const searchContainerRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      // @ts-ignore
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsOpen(false)
        setSearch('')
      }
    }
    setIsOpen(false)
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [pathname])

  React.useEffect(() => {
    const delayDebounced = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search
        })
        router.push(newUrl, { scroll: false })
      } else {
        if (query) {
          const newUrl = removeKeyFromUrl({
            params: searchParams.toString(),
            keysToRemove: ['global', 'type']
          })
          router.push(newUrl, { scroll: false })
        }
      }
    }, 3000)

    return () => {
      clearTimeout(delayDebounced)
    }
  }, [search, router, pathname, searchParams, query])
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden" ref={searchContainerRef}>
      <div className="bg-light-800 dark:bg-gray-900 relative flex  min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src={"/images/search.svg"}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search globally"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            if (!isOpen) setIsOpen(true)
            if (e.target.value === '' && isOpen) setIsOpen(false)
          }}
          className="font-normal   dark:bg-gray-800 border-none shadow-none outline-none"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
