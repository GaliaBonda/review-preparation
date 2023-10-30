import { all, fork } from "redux-saga/effects";
import { watchGetQuestions } from "./saga";

const rootSaga = function* () {
  yield all([
    fork(watchGetQuestions),
    // Other forks
  ]);
};

export default rootSaga;