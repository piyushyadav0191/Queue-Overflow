"use client";
import { FilterProps } from "@/types";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  filters: FilterProps[];
  otherClasses?: string;
  containerClasses?: string;
};

const Filters = ({ filters, containerClasses, otherClasses }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const paramFilter = searchParams.get('filter')
  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'filter',
      value
    })
    router.push(newUrl, { scroll: false })
  }
  return (
    <div className={`relative ${containerClasses}`}>
      <Select onValueChange={handleUpdateParams} defaultValue={paramFilter || undefined}>
        <SelectTrigger
          className={`${otherClasses} bg-light-800  dark:bg-gray-800   border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((filter, index) => (
              <SelectItem
                key={index}
                className="text-left dark:bg-gray-800"
                value={filter.value}
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
