import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
};

const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/images/no_result.svg"
        width={230}
        height={230}
        className="block object-contain dark:flex"
        alt=""
      />
      <h2 className="font-bold text-xl mt-8">{title} </h2>
      <p className="text-md  my-3.5 max-w-md text-center">{description}</p>
      <Link href={link}>
        <Button className="mt-3 min-h-[46px] rounded-lg bg-primary-500 px-3 py-3 font-semibold">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
