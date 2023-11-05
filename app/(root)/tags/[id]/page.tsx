import QuestionCard from "@/components/cards/QuestionCard"
import NoResult from "@/components/shared/NoResult"
import LocalSearchbar from "@/components/shared/search/LocalSearchbar"
import { IQuestion } from "@/database/question.model"
import { getQuestionByTagID } from "@/lib/actions/tag.action"

type Props = {
  params: {
    id: string
  }
  searchParams: {
    q: string
  }
}

const page = async ({ params, searchParams }: Props) => {
  const result = await getQuestionByTagID({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q
  })
  return (
    <>
      <h1 className="font-bold text-3xl">{result?.tagTitle}</h1>
      <div className="mt-11 w-full">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/images/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />

      </div>
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {result?.questions.length > 0 ? (
          result?.questions.map((question: any) => (
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
            title={"There's no tag question saved to show"}
            description={
              " Be the first to break the silence! Ask a question and kickstart the discussion. Our query could be next big thing others learn from"
            }
            link={"/ask-question"}
            linkTitle={"Ask a Question"}
          />
        )}
      </div>
    </>
  )
}

export default page
