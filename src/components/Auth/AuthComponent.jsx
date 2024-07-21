import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AuthComponent = ({ children }) => {
  const { user } = useSelector((state) => state.userInfo);

  // if (!user?._id) {
  //   return <div>Loading...</div>;
  // }

  return user?._id ? children : <Navigate to={"/"} />;
};
