import QuestionCard from "@/components/cards/QuestionCard";
import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestion } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

const page = async () => {
  const { userId } = auth()
  if (!userId) return null

  const result = await getSavedQuestion({
    clerkId: userId
  });

  return (
    <>
      <h1 className="font-bold text-3xl">Saved Questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/images/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filters
          filters={QuestionFilters}
          otherClasses="min-h-[50px] sm:min-w-[170px]"
        />
      </div>
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
            title={"There's no question saved to show"}
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

export default page;
