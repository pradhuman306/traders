import React from "react";
import { Navigate } from "react-router";
import * as localStorage from "../common/localStorage";

function PrivateRoute({ children, auth }) {
  const token = localStorage.get("traders_token")
    ? atob(localStorage.get("traders_token"))
    : null;

  return token ? children : <Navigate to="/signin" />;
}
export default PrivateRoute;
