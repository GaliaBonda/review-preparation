"use client"

import { QuestionType } from "@custom-types/question-type";
import React, { FC, useEffect } from "react";
import { Question } from "./Question";
import { getAllQuestions } from "@store/actions/questions-actions";
import { RootState, useAppDispatch, useAppSelector } from "@store";
import { PayloadAction } from "@reduxjs/toolkit";
import { addQuestionsAsync } from "@store/thunk-reducers";
import { getQuestions } from "@store/saga-reducers";
import { GET_QUESTIONS } from "@store/constants/saga-types";

type QuestionsProps = {
  questions: QuestionType[];
};

export const Questions: FC<QuestionsProps> = ({ questions }) => {
  const dispatch = useAppDispatch();

 useEffect(() => {
  //thunk
  // dispatch(addQuestionsAsync())
  // OR
  // dispatch(getAllQuestions)

  //saga
  dispatch({type: GET_QUESTIONS})
 }, []);

 useEffect(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
    });
  } else {
    /* geolocation IS NOT available */
  }
 }, []);

 useEffect(() => {
  sessionStorage.setItem('wuestions', 'goood')
 }, []);

const questions1 = useAppSelector(state => state.questions);
  console.log(questions1)

  return (
    <div className="grid grid-cols-3 gap-4">
      {questions.map(({ content, tags, section, creator, id }) => {
        return <Question id={id} key={id} content={content} creator={creator} tags={tags} section={section} />;
      })}
    </div>
  );
};
