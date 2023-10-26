"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
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
        value={""}
        onChange={() => {}}
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
