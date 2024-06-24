import {
  fetchUserProfile,
  postLoginUser,
  postNewUser,
  renewAccessJwt,
  verifyUserLink,
} from "./userAxios";
import { setUser } from "./userSlice";

// fetch user profile action
export const fetchUserAction = () => async (dispatch) => {
  const { status, user } = await fetchUserProfile();
  status === "success" && dispatch(setUser(user));
};

// sign user action
export const createUserAction = async (obj) => {
  return await postNewUser(obj);
};

// verify user action
export const verifyUserAction = async (obj) => {
  return await verifyUserLink(obj);
};

// login user action
export const loginUserAction = (obj) => async (dispatch) => {
  const { status, tokens } = await postLoginUser(obj);

  if (status === "success") {
    localStorage.setItem("refreshJWT", tokens.refreshJWT);
    sessionStorage.setItem("accessJWT", tokens.accessJWT);

    dispatch(fetchUserAction());
  }
};

// auto login user
export const autoLoginAction = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  if (accessJWT) {
    return dispatch(fetchUserAction());
  }

  if (refreshJWT) {
    const { accessJWT } = await renewAccessJwt();
    accessJWT && dispatch(fetchUserAction());
  }
};
