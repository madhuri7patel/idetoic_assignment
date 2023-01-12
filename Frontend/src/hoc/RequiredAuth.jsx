import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const RequiredAuth = ({ children }) => {
  let token = localStorage.getItem("token");

  const location = useLocation();
  const from = {
    pathname: location.pathname,
  };

  if (token ? true : false) return children;
  return <Navigate to={"/login"} state={from} replace />;
};

export default RequiredAuth;
