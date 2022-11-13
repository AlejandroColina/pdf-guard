import axios from "axios";

export const checkLogin = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("http://localhost:3001/login", body);
      console.log("--->", data);
      if (data) {
        sessionStorage.setItem("ingress", true);
        sessionStorage.setItem("auth", true);
      } else {
        sessionStorage.setItem("ingress", false);
        sessionStorage.setItem("auth", false);
      }
      return dispatch({
        type: "AUTH",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const newUser = (body) => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:3001/user", body);
      return dispatch({
        type: "NEW_USER",
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const newFiledb = (body) => {
  return async (dispatch) => {
    try {
      let response = await axios.post("http://localhost:3001/file", body);
      return dispatch({
        type: "NEW_FILE",
        payload: response,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRestorePassword = (email) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `http://localhost:3001/login?email=${email}`
      );
      return dispatch({
        type: "LOSS_PASSWORD",
        payload: response.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const verifyEmail = (email) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/login/search-email?email=${email}`
      );
      return dispatch({
        type: "CHECK_EMAIL",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getFiles = (input) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `http://localhost:3001/file?searched=${input}`
      );
      return dispatch({
        type: "GET_FILES",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getFaculties = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get("http://localhost:3001/faculty");
      return dispatch({
        type: "GET_FACULTIES",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUser = (email) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `http://localhost:3001/user?email=${email}`
      );
      return dispatch({
        type: "GET_USER",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteFile = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/file?id=${id}`);
      return dispatch({
        type: "DELETE_FILE",
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const closeAuth = () => {
  return {
    type: "CLOSE_AUTH",
    payload: false,
  };
};

export const setAuthTrue = () => {
  return {
    type: "SET_AUTH_TRUE",
    payload: true,
  };
};

export const setAuthFalse = () => {
  return {
    type: "SET_AUTH_FALSE",
    payload: false,
  };
};
