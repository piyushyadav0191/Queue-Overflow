import Link from "next/link";
import React from "react";
import Metric from "../shared/Metric";
import { getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

type Props = {
  _id: string;
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  question: {
    _id: string;
    title: string;
  };
  createdAt: string;
  clerkId?: string | null;
};

const AnswersTab = ({
  _id,
  author,
  createdAt,
  upvotes,
  question,
  clerkId
}: Props) => {
  const showActionsButton = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-[10px] dark:shadow-dark-100 shadow-dark-400  border-primary-500 border-4">
      <Link href={`/question/${question._id}/#${_id}`}>
        <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
          <div>
            <span className="line-clamp-1 flex sm:hidden">
              {getTimeStamp(createdAt)}
            </span>
            <Link href={`/question/${_id}`}>
              <h1 className="sm:font-semibold sm:text-sm font-semibold text-xl line-clamp-1 flex-1">
                {question.title}
              </h1>
            </Link>
            <SignedIn>
              {showActionsButton && (
                <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
              )}
            </SignedIn>
          </div>
          {/* if signed in add delete  */}
        </div>

        <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <Metric
            imgUrl={author.picture}
            alt="users"
            value={author.name}
            title={`- asked ${getTimeStamp(createdAt)}`}
            textStyles={"font-medium flex  text-black dark:text-gray-300 "}
            href={`/profile/${author._id}`}
            isAuthor={true}
          />
          <Metric
            imgUrl={"/images/heart.svg"}
            alt="Upvotes"
            value={upvotes.length}
            title="Votes"
            textStyles={"font-medium flex  text-black dark:text-gray-300 "}
            isAuthor={false}
          />
        </div>
      </Link>
    </div>
  );
};

export default AnswersTab;
