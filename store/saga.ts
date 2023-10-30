import { PayloadAction } from "@reduxjs/toolkit";
import { PutEffect, put, takeEvery, takeLatest } from "redux-saga/effects";
import {GET_QUESTIONS} from "./constants/saga-types";
import { getQuestions, getQuestionsError } from "@store/saga-reducers";

// Generator function
function* getQuestionsSaga(): unknown {
  try {
    // You can also export the axios call as a function.
    
    const response = yield fetch("http://localhost:3000/api/question/").then(res => res.json());
    yield put(getQuestions(response));
  } catch (error) {
    yield put(getQuestionsError());
  }
}

// Generator function
export function* watchGetQuestions() {
  yield takeLatest(GET_QUESTIONS, getQuestionsSaga);
}