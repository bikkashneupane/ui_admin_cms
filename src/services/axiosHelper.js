import axios from "axios";

const getRefreshJwt = () => {};
const getAccessJwt = () => {};

export const apiProcessor = async ({
  url,
  method,
  data,
  isPrivate,
  isRefreshJwt,
}) => {
  try {
    const headers = {
      Authorization: isPrivate
        ? isRefreshJwt
          ? getRefreshJwt()
          : getAccessJwt()
        : null,
    };
    const response = await axios({ url, method, data, headers });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
