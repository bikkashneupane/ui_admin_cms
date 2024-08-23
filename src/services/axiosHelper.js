import axios from "axios";
import { toast } from "react-toastify";
import { renewAccessJwt } from "../features/user/userAxios";

const getRefreshJwt = () => {
  return localStorage.getItem("refreshJWT");
};

const getAccessJwt = () => {
  return sessionStorage.getItem("accessJWT");
};

export const axiosProcessor = async ({
  url,
  method,
  data,
  isPrivate,
  isRefreshJwt,
  showToast,
}) => {
  try {
    const headers = {
      Authorization: isPrivate
        ? isRefreshJwt
          ? getRefreshJwt()
          : getAccessJwt()
        : null,
    };

    let response = {};
    const pending = axios({ url, method, data, headers });

    if (showToast) {
      toast.promise(pending, {
        pending: "Please Wait...",
      });

      response = await pending;
      toast[response.data.status](response.data.message);
    }

    response = await pending;
    return response.data;
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.message?.includes("jwt expired")) {
      const accessJWT = await renewAccessJwt();
      if (accessJWT) {
        return await axiosProcessor({
          url,
          method,
          data,
          isPrivate,
          showToast,
        });
      }
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
    }

    showToast && toast.error(error.response.data.message);

    return error.response.data;
  }
};
