import { AppDispatch } from "@store";
import { addMany } from "@store/thunk-reducers";

export const getAllQuestions =  (dispatch: AppDispatch) => {
  fetch("http://localhost:3000/api/question/", {})
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data)
      dispatch(addMany(data));
    });
  // shop.getProducts(products => {
  //   dispatch(receiveProducts(products))
  // })
};
