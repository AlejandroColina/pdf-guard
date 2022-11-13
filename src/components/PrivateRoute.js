import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useSelector((state) => state);
  sessionStorage.getItem("auth");

  return (
    <Route {...rest}> {auth ? <Component /> : <Redirect to="/" />} </Route>
  );
};

export default PrivateRoute;
