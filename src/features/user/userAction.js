import {
  fetchAllUsers,
  fetchUserProfile,
  logoutUser,
  postLoginUser,
  postNewUser,
  renewAccessJwt,
  verifyUserLink,
} from "./userAxios";
import { setAllUser, setUser } from "./userSlice";

// fetch user profile action
export const fetchUserAction = () => async (dispatch) => {
  const { status, user } = await fetchUserProfile();
  status === "success" && dispatch(setUser(user));

  // get al users and update the store
  const { allUsers } = await fetchAllUsers();
  status === "success" && dispatch(setAllUser(allUsers));
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
  if (accessJWT) {
    return dispatch(fetchUserAction());
  }

  const refreshJWT = localStorage.getItem("refreshJWT");
  if (refreshJWT) {
    const { accessJWT } = await renewAccessJwt();
    accessJWT && dispatch(fetchUserAction());
  }
};

// user logout action
export const logoutUserAction = () => async (dispatch) => {
  // call api authorization for backend logout
  const { status } = await logoutUser();

  if (status === "success") {
    // frontend logout ==> dispatch setUser()
    dispatch(setUser({}));
    localStorage.removeItem("refreshJWT");
    sessionStorage.removeItem("accessJWT");
  }
};
