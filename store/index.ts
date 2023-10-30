import thunk from "redux-thunk";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "@store/saga-reducers";
// import reducer from "@store/thunk-reducers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  reducer,
  //thunk
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     thunk : true,
  //   }),

  //saga
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export const useAppDispatch: () => AppDispatch = useDispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
