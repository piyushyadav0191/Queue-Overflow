import Link from "next/link";
import React from "react";
import RenderTags from "../shared/RenderTags";
import Metric from "../shared/Metric";
import { getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

type Props = {
  title: string;
  tags: { _id: string; name: string }[];
  _id: string;
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId?: string | null;
  };
  upvotes: string[];
  views: number;
  answers: Array<Object>;
  createdAt: string;
  clerkId?: string | null;
};

const QuestionCard = ({
  _id,
  answers,
  author,
  createdAt,
  tags,
  title,
  upvotes,
  views,
  clerkId
}: Props) => {

  const showActionsButton = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-[10px] dark:shadow-dark-100 shadow-dark-400  border-primary-500 border-4 dark:bg-gray-800">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h1 className="sm:font-semibold sm:text-sm font-semibold text-xl line-clamp-1 flex-1">
              {title}
            </h1>
          </Link>
          <SignedIn>

          </SignedIn>
        </div>
        <SignedIn>
          {showActionsButton && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>
      <div className="mt-3 5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTags key={tag._id} _id={tag._id} name={tag.name} />
        ))}
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
        <Metric
          imgUrl={"/images/message-circle.svg"}
          alt="message"
          value={answers.length}
          title="Answers"
          textStyles={"font-medium flex  text-black dark:text-gray-300 "}
          isAuthor={false}
        />
        <Metric
          imgUrl={"/images/eye.svg"}
          alt="eye"
          value={views}
          title="Views"
          textStyles={"font-medium flex  text-black dark:text-gray-300 "}
          isAuthor={false}
        />
      </div>
    </div>
  );
};

export default QuestionCard;
