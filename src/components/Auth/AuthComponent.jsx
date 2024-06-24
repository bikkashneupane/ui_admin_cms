import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthComponent = ({ children }) => {
  const { user } = useSelector((state) => state.userInfo);
  // const navigate = useNavigate()

  return user?._id ? children : <Navigate to={"/"} />;
};
