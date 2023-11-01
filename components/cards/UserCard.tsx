import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import RenderTags from "../shared/RenderTags";

type Props = {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
};

const UserCard = async ({ user }: Props) => {
  const interectedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="text-2xl line-clamp-1">{user.name} </h3>
          <p className="mt-2">{user.username}</p>
        </div>
        <div className="mt-5">
          {interectedTags?.length > 0 ? (
            <div>
              {interectedTags?.map((tag) => (
                <RenderTags key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
