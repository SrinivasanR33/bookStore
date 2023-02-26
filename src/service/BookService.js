import axios from "axios";
import { errorAction } from "./LoginService";
const token = localStorage.getItem("token");
const api = axios.create({
  baseURL: "https://bookstore.api.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
export const loadingPage = (loadingpage) => async (dispatch, getState) => {
  dispatch({
    type: "GLOBLE_LOADING",
    payload: loadingpage,
  });
};

export const getAllBooks = () => async (dispatch, getState) => {
  api.get(`/books`).then((val) => {
    console.log(val);
    dispatch({
      type: "GET_BOOKS",
      payload: val.data.data,
    });
  });
};
export const SearchBooks = (data) => async (dispatch, getState) => {
  api.post(`/books/search`, data).then((val) => {
    console.log(val);
    if (val.data.data && val.data.data.length > 0) {
      dispatch({
        type: "GET_SEARCH_BOOK",
        payload: val.data.data,
      });
    } else {
      dispatch({
        type: "GET_SEARCH_BOOK",
        payload: [],
      });
    }
  });
};
export const BookInfo = (data) => async (dispatch, getState) => {
  dispatch(loadingPage(true));

  api.post(`/books/info`, data).then((val) => {
    console.log(val);
    if (val.data.data && val.data.data.length > 0) {
      dispatch(loadingPage(false));
      dispatch({
        type: "GET_BOOK_INFO",
        payload: val.data.data,
      });
    } else {
      dispatch(loadingPage(false));
      dispatch({
        type: "GET_BOOK_INFO",
        payload: [],
      });
    }
  });
};
export const CreateBook = (data) => async (dispatch, getState) => {
  api.post(`/books`, data).then((val) => {
    console.log(val);
  });
};
export const ViewBook = async (data) => {
  const res = await api.get(`/books/${data}`);

  // dispatch({type:"IMAGE_URL",payload:val.data})
  return res.data;
};
export const UpdateBook = (data) => async (dispatch, getState) => {
  await api.put(`/books`, data).then((val) => {
    console.log(val);
  })
  .catch((err) =>   dispatch(errorAction(err)));
};
export const getBook = (data) => async (dispatch, getState) => {
  await api
    .post(`/books/search`, data)
    .then((val) => {
      console.log(val);
      if (val.data.data && val.data.data.length > 0) {
        dispatch({
          type: "GET_BOOK_SEARCH",
          payload: val.data.data,
        });
      } else {
        dispatch({
          type: "GET_BOOK_SEARCH",
          payload: [],
        });
      }
    })
    .catch((err) => dispatch(errorAction(err)));
};
export const bookRenting = (data) => async (dispatch, getState) => {
  api
    .post(`/rent/list`, {
      "userInfo.email": data.userInfo ? data.userInfo.email : null,
    })
    .then((val) => {
      console.log(val);
      if (val.data && val.data.success) {
        alert("already mapped");
      } else {
        api.post(`/rent/mapping`, data).then((val) => {
          console.log(val);
          if (val.data.data && val.data.data.length > 0) {
            dispatch({
              type: "GET_RENTMAPPING",
              payload: val.data.data,
            });
          } else {
            dispatch({
              type: "GET_RENTMAPPING",
              payload: [],
            });
          }
        });
      }
    });
};
export const bookRentingList = (data) => async (dispatch, getState) => {
  dispatch(bookRenting({ _id: data.id }))
    .then((val) => {
      if (val.data.success) {
        alert("already mapped");
      } else {
        api.post(`/rent/list`, data).then((val) => {
          console.log(val);
          if (val.data.data && val.data.data.length > 0) {
            dispatch({
              type: "GET_RENTLIST",
              payload: val.data.data,
            });
          } else {
            dispatch({
              type: "GET_RENTLIST",
              payload: [],
            });
          }
        });
      }
    })
    .catch((err) => dispatch(errorAction(err)));
};
export const deleteBook = (id) => async (dispatch, getState) => {
  console.log(id);

  await api
    .patch(`/books`, id)
    .then((val) => {
      console.log(val);
      dispatch(getBook());
      return val;
    })
    .catch((err) => dispatch(errorAction(err)));
};
