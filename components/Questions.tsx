
import { QuestionType } from "@custom-types/question-type";
import React, { FC } from "react";
import { Question } from "./Question";

type QuestionsProps = {
  questions: QuestionType[];
};

export const Questions: FC<QuestionsProps> = ({ questions }) => {
 

  return (
    <div className="grid grid-cols-3 gap-4">
      {questions.map(({ content, tags, section, creator, id }) => {
        return <Question id={id} key={id} content={content} creator={creator} tags={tags} section={section} />;
      })}
    </div>
  );
};
