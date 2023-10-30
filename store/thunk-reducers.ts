import { Action, combineReducers } from "redux";
import {
  ADD_QUESTION,
  DELETE_QUESTION,
  EDIT_QUESTION,
} from "./constants/ActionTypes";
import { QuestionSection, QuestionType } from "@custom-types/question-type";
import { CaseReducer, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addQuestionsAsync = createAsyncThunk(
  'counter/fetchCount',
  async () => {
    const response = await fetch("http://localhost:3000/api/question/").then(res => res.json());
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

type StatusType = "idle" | 'failed' | 'loading'

const questionsSlice = createSlice({
  name: "question",
  initialState: {questions: [] as QuestionType[], status: "idle" as StatusType},
  reducers: {
    add: (state, action: PayloadAction<QuestionType>) => {
      console.log(action.payload)
      state.questions = [...state.questions, action.payload];
      // return {...state, questions: [...state.questions, action.payload]};
    },
    addMany: (state, action: PayloadAction<QuestionType[]>) => {

      return {...state, questions: action.payload};
    },
    remove: (state, action: PayloadAction<Partial<QuestionType>>) => {
     return {...state, questions: state.questions.filter(({ id }) => id !== action.payload.id)};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addQuestionsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addQuestionsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.questions = action.payload;
      })
      .addCase(addQuestionsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { add, remove, addMany } = questionsSlice.actions;

export default questionsSlice.reducer;
