import {
  fetchUserProfile,
  postLoginUser,
  postNewUser,
  verifyUserLink,
} from "./userAxios";
import { setUser } from "./userSlice";

// // global pending toast
// export const apiProcessWithToast = async (func, obj) => {
//   const pending = func(obj);
//   toast.promise(pending, { pending: "Please Wait..." });

//   const response = await pending;
//   toast[response.status](response.message);

//   return response;
// };

// fetch user profile action
export const fetchUserAction = () => async (dispatch) => {
  const { status, user } = await fetchUserProfile();
  console.log(user);
  status === "success" && dispatch(setUser(user));
};

// sign user action
export const createUserAction = async (obj) => {
  return await postNewUser(obj, { showToast: true });
};

// login user action
export const loginUserAction = (obj) => async (dispatch) => {
  const { status, tokens } = await postLoginUser(obj, { showToast: true });
  console.log(tokens);

  if (status === "success") {
    localStorage.setItem("refreshJWT", tokens.refreshJWT);
    sessionStorage.setItem("accessJWT", tokens.accessJWT);
    dispatch(fetchUserAction());
  }
};

// verify user action
export const verifyUserAction = async (obj) => {
  return await verifyUserLink(obj, { showToast: true });
};
