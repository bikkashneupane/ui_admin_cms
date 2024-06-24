import { apiProcessor } from "../../services/axiosHelper";

const userEP = import.meta.env.VITE_APP_SERVER_ROOT + "/api/v1/users";

// post new user
export const postNewUser = (obj) => {
  return apiProcessor({
    url: userEP + "/register",
    method: "POST",
    data: obj,
    showToast: true,
  });
};

// login user
export const postLoginUser = (obj) => {
  return apiProcessor({
    url: userEP + "/login",
    method: "POST",
    data: obj,
    showToast: true,
  });
};

// check if user is verified
export const verifyUserLink = (obj) => {
  return apiProcessor({
    url: userEP + "/user-verification",
    method: "POST",
    data: obj,
    showToast: true,
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

// auto login user
export const renewAccessJwt = async () => {
  const { accessJWT } = await apiProcessor({
    url: userEP + "/renew-access",
    method: "GET",
    isPrivate: true,
    isRefreshJwt: true,
    showToast: true,
  });

  sessionStorage.setItem("accessJWT", accessJWT);
  return accessJWT;
};
