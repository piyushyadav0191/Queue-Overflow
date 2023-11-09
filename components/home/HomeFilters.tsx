"use client";

import { HomePageFilters } from "@/constants/filters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

type Props = {};

const HomeFilters = (props: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [active, setActive] = useState('')

  const handleTypeClick = (item: string) => {

    if (active === item) {
      setActive("")
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null
      })
      router.push(newUrl, { scroll: false })
    } else {
      setActive(item)
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLowerCase()
      })
      router.push(newUrl, { scroll: false })
    }

  }

  return (
    <div className="mt-10 flex-wrap gap-3 md:flex hidden ">
      {HomePageFilters.map((filter, index) => (
        <Button
          key={filter.value}
          onClick={() => handleTypeClick(filter.value)}
          className={`font-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === filter.value
            ? "bg-primary-500 text-white hover:text-black"
            : " text-black dark:text-white dark:bg-gray-800 "
            } `}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
