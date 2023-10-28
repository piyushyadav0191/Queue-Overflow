import Question from "@/components/forms/Question";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Ask a question</h1>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
};

export default page;
