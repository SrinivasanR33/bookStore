import axios from "axios";

import { handleToeast } from "../unit/Unit";
const api = axios.create({
  baseURL: "https://bookstore.api.onrender.com",
});

export const errorAction = (err) => async (dispatch, getState) => {
  if (err.response.status === 401) {
    handleToeast("error", "Bad Credencial");
  }
  if (err.response.status === 403) {
    dispatch({ type: "LOGINSTATE", payload: false });
    dispatch({ type: "MAIN_SCREEN_OPTION", payload: 1 });
  }
};
export const login = (data) => async (dispatch, getState) => {
  await api
    .post(`/auth`, data)
    .then((val) => {
      console.log(val);
      localStorage.setItem("token", val.data?.accessToken);
      dispatch({ type: "MAIN_SCREEN_OPTION", payload: 0 });
      dispatch({ type: "LOGINSTATE", payload: true });
      dispatch({ type: "LOGINS_TOKEN", payload: val.data });
      handleToeast("success", "Login Successfully");
    })
    .catch((err) => {
      console.log(err);
      dispatch(errorAction(err));
    });
};
export const logout = () => async (dispatch, getState) => {
  await api
    .post(`/auth/logout`)
    .then((val) => {
      console.log(val);
      dispatch({ type: "MAIN_SCREEN_OPTION", payload: 1 });
      dispatch({ type: "LOGINSTATE", payload: false });
      localStorage.setItem("token", null);
      handleToeast("success", "Logout Successfully");
    })
    .catch((err) => {
      dispatch(errorAction(err));
    });
};
