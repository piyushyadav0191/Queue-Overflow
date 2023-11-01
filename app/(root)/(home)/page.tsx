import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const result = await getQuestions();

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-bold text-3xl">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
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
        {result?.questions.length > 0 ? (
          result?.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              createdAt={question.createdAt}
              answers={question.answers}
            />
          ))
        ) : (
          <NoResult
            title={"There's no question to show"}
            description={
              " Be the first to break the silence! Ask a question and kickstart the discussion. Our query could be next big thing others learn from"
            }
            link={"/ask-question"}
            linkTitle={"Ask a Question"}
          />
        )}
      </div>
    </>
  );
};

export default Home;
