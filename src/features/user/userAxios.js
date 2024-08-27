import { axiosProcessor } from "../../services/axiosHelper";

const userEP = import.meta.env.VITE_APP_SERVER_ROOT + "/api/v1/users";

// post new user
export const postNewUser = (obj) => {
  return axiosProcessor({
    url: userEP + "/register",
    method: "POST",
    data: obj,
    showToast: true,
  });
};

// login user
export const postLoginUser = (obj) => {
  return axiosProcessor({
    url: userEP + "/login",
    method: "POST",
    data: obj,
    showToast: true,
  });
};

// check if user is verified
export const verifyUserLink = (obj) => {
  return axiosProcessor({
    url: userEP + "/user-verification",
    method: "POST",
    data: obj,
    showToast: true,
  });
};

// get user profile
export const fetchUserProfile = () => {
  return axiosProcessor({
    url: userEP,
    method: "GET",
    isPrivate: true,
  });
};

// get user profile
export const fetchAllUsers = () => {
  return axiosProcessor({
    url: userEP + "/all",
    method: "GET",
    isPrivate: true,
  });
};

// auto login user
export const renewAccessJwt = async () => {
  const { accessJWT } = await axiosProcessor({
    url: userEP + "/renew-access",
    method: "GET",
    isPrivate: true,
    isRefreshJwt: true,
  });

  accessJWT && sessionStorage.setItem("accessJWT", accessJWT);
  return accessJWT;
};

// logout user
export const logoutUser = async () => {
  return axiosProcessor({
    url: userEP,
    method: "DELETE",
    isPrivate: true,
    isRefreshJwt: true,
    showToast: true,
  });
};

// request OTP
export const requestOTP = async (data) => {
  return axiosProcessor({
    url: userEP + "/otp",
    method: "POST",
    data,
  });
};

// reset Password
export const resetPasswordAxios = async (data) => {
  return axiosProcessor({
    url: userEP + "/password/reset",
    method: "POST",
    data,
  });
};

// edit user role
export const editRoleAxios = async (data) => {
  return axiosProcessor({
    url: userEP + "/edit-role",
    method: "PUT",
    data,
    isPrivate: true,
    showToast: true,
  });
};
