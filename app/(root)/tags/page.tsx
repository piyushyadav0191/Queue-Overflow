import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import {  UserFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import Link from "next/link";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const result = await getAllTags({})
  
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-bold text-3xl">All Users</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/images/search.svg"
          placeholder="Search for unique tags"
          otherClasses="flex-1"
        />
        <Filters
          filters={UserFilters}
          otherClasses="min-h-[50px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4"> 
        {result.tags.length > 0 ? (
          result?.tags.map((tag) => (
            <Link href={`/tags/${tag._id}`} key={tag._id} >
              <article className="flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px">
                <div className="w-fit rounded-sm px-5 py-1.5">
                  <p>
                    {tag.name}
                  </p>
                </div>
                <p className="mt-3.5">
                  <span className="font-semibold mr-2.5">{tag.questions.length}+ </span> Questions
                </p>
              </article>
            </Link>
          )
          )
        ) : (
         <NoResult title="No Tags found" description="It looks like there are no tags found" link="/ask-question" linkTitle="Ask a question"  />
        )}
      </section>
    </>
  );
};

export default page;
