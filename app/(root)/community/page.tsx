import UserCard from "@/components/cards/UserCard";
import Filters from "@/components/shared/Filters";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters, UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }: any) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-bold text-3xl">All Users</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/images/search.svg"
          placeholder="Search for amazing peoples"
          otherClasses="flex-1"
        />
        <Filters
          filters={UserFilters}
          otherClasses="min-h-[50px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result?.users.length > 0 ? (
          result?.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="mx-auto max-w-4xl text-center">
            <p>no users yet</p>
            <Link href={"/sign-up"} className="mt-1 font-bold text-accent-blue">
              Join to be the first
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default page;
