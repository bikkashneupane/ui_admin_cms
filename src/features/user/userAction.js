import { postLoginAdmin, postNewAdmin } from "./userAxios";
import { toast } from "react-toastify";

// global pending toast
export const apiProcessWithToast = async (func, obj) => {
  const pending = func(obj);
  toast.promise(pending, { pending: "Please Wait..." });

  const response = await pending;
  toast[response.status](response.message);

  return response;
};

// sign user action
export const createNewAdminAction = async (obj) => {
  const { status, message } = await apiProcessWithToast(postNewAdmin, obj);
  console.log(status, message);
  //TODO
};

// login user action
export const loginAdminAction = async (obj) => {
  const { status, message } = await apiProcessWithToast(postLoginAdmin, obj);
  console.log(status, message);
  //TODO
};
