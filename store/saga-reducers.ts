import { Action, combineReducers } from "redux";
import {
  ADD_QUESTION,
  DELETE_QUESTION,
  EDIT_QUESTION,
} from "./constants/ActionTypes";
import { QuestionSection, QuestionType } from "@custom-types/question-type";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

type StatusType = "idle" | 'failed' | 'loading'

const questionsSlice = createSlice({
  name: "question",
  initialState: {questions: [] as QuestionType[], status: "idle" as StatusType},
  reducers: {
    /* This action will trigger our saga middleware
       and set the loader to true and reset error message.
    */
    getQuestions: (state, { payload }: PayloadAction<QuestionType[]>) => {
      state.questions = payload;
      state.status = 'idle'
    //   return {...state, questions: payload};
    },
    getQuestionsError: (state) => {
      state.status = 'failed';
    },
    
  }
 
});

export const {getQuestions, getQuestionsError } = questionsSlice.actions;

export default questionsSlice.reducer;
