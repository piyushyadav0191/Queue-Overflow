import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

type Props = {};

const GlobalSearch = (props: Props) => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="bg-light-800 dark:bg-gray-800 relative flex  min-h-[56px] grow items-center gap-1 rounded-xl px-4">
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
          value={""}
          className="font-normal   dark:bg-gray-800 border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
