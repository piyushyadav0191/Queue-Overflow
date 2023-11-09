"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeyFromUrl } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
};

const LocalSearchbar = ({
  iconPosition,
  imgSrc,
  placeholder,
  route,
  otherClasses,
}: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  const [search, setSearch] = React.useState(query || '')

  React.useEffect(() => {
    const delayDebounced = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search
        })
        router.push(newUrl, { scroll: false })
      } else {
        if (pathname === route) {
          const newUrl = removeKeyFromUrl({
            params: searchParams.toString(),
            keysToRemove: ['q']
          })
          router.push(newUrl, { scroll: false })
        }
      }
    }, 3000)

    return () => {
      clearTimeout(delayDebounced)
    }
  }, [search, route, pathname, router, searchParams, query])

  return (
    <div
      className={`bg-light-800  dark:bg-gray-800 flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt=""
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="font-normal bg-light-800 shadow-none outline-none border-none dark:bg-gray-700"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt=""
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;
