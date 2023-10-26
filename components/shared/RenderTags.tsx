import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

type Props = {
  _id: number;
  name: string;
  totalQuestions: number;
  showCount: boolean;
};

const RenderTags = ({ _id, name, showCount, totalQuestions }: Props) => {
  return (
    <div>
      <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
        <Badge
          variant={"outline"}
          className="font-medium bg-gray-300 dark:bg-gray-300 text-black rounded-md border-none mx-4 py-2 uppercase"
        >
          {name}
        </Badge>
        {showCount && <p className="font-medium text-sm ">{totalQuestions}</p>}
      </Link>
    </div>
  );
};

export default RenderTags;
