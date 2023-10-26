import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTags from "./RenderTags";

type Props = {};

const RIghtSidebar = (props: Props) => {
  const hotQuestions = [
    { _id: 1, title: "how do i use express" },
    { _id: 2, title: "how do i use express" },
    { _id: 3, title: "how do i use express" },
    { _id: 4, title: "how do i use express" },
    { _id: 5, title: "how do i use express" },
  ];

  const popularTags = [
    { _id: 1, name: "javascript", totalQuestions: 5 },
    { _id: 2, name: "react", totalQuestions: 5 },
    { _id: 3, name: "express", totalQuestions: 5 },
    { _id: 4, name: "node", totalQuestions: 5 },
    { _id: 5, name: "mongodb", totalQuestions: 5 },
  ];

  return (
    <section className="bg-gray-200-0 dark:bg-gray-800 sticky left-0 top-0 flex h-screen flex-col  overflow-y-auto  p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden max-xl:hidden w-[350px] ">
      <div>
        <h3 className="font-bold text-xl">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="font-medium">{question.title}</p>
              <Image
                src={"/images/chevron-right.svg"}
                width={20}
                height={20}
                alt="icon"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-xl font-bold ">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTags
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RIghtSidebar;
