import { getCategoryAction, getSubCatAction } from "../category/categoryAction";
import { fetchAllOrdersAction } from "../order/orderAction";
import { getProductAction } from "../product/productAction";
import { getReviewAction } from "../review/reviewAction";
import {
  editProfileDetailAxios,
  editRoleAxios,
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

  // get all users and update the store
  const { allUsers } = await fetchAllUsers();
  if (status === "success") {
    dispatch(setAllUser(allUsers));

    dispatch(getCategoryAction());
    dispatch(getSubCatAction());
    dispatch(getProductAction());
    dispatch(fetchAllOrdersAction());
    dispatch(getReviewAction());
  }
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
    const accessJWT = await renewAccessJwt();
    accessJWT
      ? dispatch(fetchUserAction())
      : localStorage.removeItem("refreshJWT");
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

// edit user role
export const editRoleAction =
  (obj, hideModal, navigate) => async (dispatch) => {
    const { status } = await editRoleAxios(obj);
    if (status === "success") {
      const { allUsers } = await fetchAllUsers();

      status === "success" && dispatch(setAllUser(allUsers));
      hideModal();
      navigate("/admin/users");
    }
  };

// update profile
export const editProfileDetail = (obj, name) => async (dispatch) => {
  const { status } = await editProfileDetailAxios(obj, name);
  if (status === "success") {
    if (name === "password") {
      logoutUserAction();
      return;
    }
    dispatch(fetchUserAction());
  }
};
