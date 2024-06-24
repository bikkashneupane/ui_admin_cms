import axios from "axios";
import { toast } from "react-toastify";

const getRefreshJwt = () => {
  return localStorage.getItem("refreshJWT");
};

const getAccessJwt = () => {
  return sessionStorage.getItem("accessJWT");
};

export const apiProcessor = async ({
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
        position: "bottom-right",
      });

      response = await pending;
      toast[response.data.status](response.data.message, {
        position: "bottom-right",
      });
    }

    response = await pending;
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message, { position: "bottom-right" });
    return error.response.data;
  }
};
