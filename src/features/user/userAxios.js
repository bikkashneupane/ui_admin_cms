import { apiProcessor } from "../../services/axiosHelper";

const userEP = import.meta.env.VITE_APP_SERVER_ROOT + "/api/v1/users";

// post new user
export const postNewUser = (obj, showToast) => {
  return apiProcessor({
    url: userEP + "/register",
    method: "POST",
    data: obj,
    showToast,
  });
};

// login user
export const postLoginUser = (obj, showToast) => {
  console.log(obj, showToast);
  return apiProcessor({
    url: userEP + "/login",
    method: "POST",
    data: obj,
    showToast,
  });
};

// check if user is verified
export const verifyUserLink = (obj, showToast) => {
  return apiProcessor({
    url: userEP + "/user-verification",
    method: "POST",
    data: obj,
    showToast,
  });
};

// get user profile
export const fetchUserProfile = () => {
  return apiProcessor({
    url: userEP,
    method: "GET",
    isPrivate: true,
  });
};
