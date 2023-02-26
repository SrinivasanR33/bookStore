import axios from "axios";
import { handleToeast } from "../unit/Unit";
import { errorAction } from "./LoginService";
const token = localStorage.getItem("token");
const api = axios.create({
  baseURL: "https://bookstore-api-aex4.onrender.com",
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

export const addUserData = (data, nav) => async (dispatch, getState) => {
  data.roles = [data.roles];
  api
    .post(`/users`, data)
    .then((val) => {
      console.log(val);
      handleToeast("success", "User Created");
      localStorage.setItem("role", val.data.data[0].role);
      localStorage.setItem("email", val.data.data[0].email);

      return val;
    })
    .catch((err) => dispatch(errorAction(err)));
};
export const EditUserData = (data) => async (dispatch, getState) => {
  data.roles = [data.roles];
  await api
    .put(`/users`, data)
    .then((val) => {
      console.log(val);
      handleToeast("success", "User Updated");
      return val;
    })
    .catch((err) => dispatch(errorAction(err)));
};
export const getUser = () => async (dispatch, getState) => {
  await api
    .get(`/users`)
    .then((val) => {
      console.log(val);
      dispatch({
        type: "USER_LIST",
        payload: val.data,
      });
      return val;
    })
    .catch((err) => dispatch(errorAction(err)));
};
export const deleteUserData = (data) => async (dispatch, getState) => {
  data.id = data._id;
  delete data._id;
  const id = data.id;

  console.log(data);
  await api
    .patch(`/users`, data)
    .then((val) => {
      console.log(val);
      dispatch(getUser());
      return val;
    })
    .catch((err) => dispatch(errorAction(err)));
};
export const UserSend = (data) => async (dispatch, getState) => {
  api
    .post(`/users/sendmail`, data)
    .then((val) => {
      console.log(val);
      return val;
    })
    .catch((err) => dispatch(errorAction(err)));
};

export const findtheUser = (data) => async (dispatch, getState) => {
  api
    .post(`/user/search/`, { email: data.email })
    .then((val) => {
      dispatch({ type: "FINDUSER", payload: val.data.data });
    })
    .catch((err) => console.log(err));
};
