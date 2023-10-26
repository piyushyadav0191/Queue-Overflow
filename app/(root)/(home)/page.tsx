import HomeFilters from "@/components/home/HomeFilters";
import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const questions = [
  // {_id: 1, title: "How to use React Query?", tags: [{_id:1, name: "react"}, {_id: 2, name: "sql"}], author: "Piyush yadav", upvotes: 10, views: 100, answers:2, createdAt: "2023-09-01T12:00:00.000Z" },
  // {_id: 2, title: "How to use React Query?", tags: [{_id:1, name: "react"}, {_id: 2, name: "sql"}], author: "Piyush yadav", upvotes: 10, views: 100, answers:2, createdAt: "2023-09-01T12:00:00.000Z" },
  // {_id: 3, title: "How to use React Query?", tags: [{_id:1, name: "react"}, {_id: 2, name: "sql"}], author: "Piyush yadav", upvotes: 10, views: 100, answers:2, createdAt: "2023-09-01T12:00:00.000Z" },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-bold text-3xl">All Questions</h1>
        <Link href="/ask-questions" className="flex justify-end max-sm:w-full">
          <Button className="bg-primary-500 font-bold min-h-[46px] px-4 py-3 text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/images/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filters
          filters={HomePageFilters}
          otherClasses="min-h-[50px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex "
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {questions.length > 0 ? (
          questions.map(
            (question) =>
              // <QuestionCard />
              "questions"
          )
        ) : (
          <NoResult />
        )}
      </div>
    </>
  );
};

export default Home;
