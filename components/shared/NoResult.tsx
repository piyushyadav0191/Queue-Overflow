import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const NoResult = (props: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/images/no_result.svg"
        width={230}
        height={230}
        className="block object-contain dark:flex"
        alt=""
      />
      <h2 className="font-bold text-xl mt-8">There's no question to show</h2>
      <p className="text-md  my-3.5 max-w-md text-center">
        Be the first to break the silence! Ask a question and kickstart the
        discussion. Our query could be next big thing others learn from{" "}
      </p>
      <Link href={"/"}>
        <Button className="mt-3 min-h-[46px] rounded-lg bg-primary-500 px-3 py-3 font-semibold">
          Ask a Question
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
