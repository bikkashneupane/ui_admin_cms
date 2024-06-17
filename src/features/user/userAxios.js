import { apiProcessor } from "../../services/axiosHelper";

const userEP = import.meta.env.VITE_APP_SERVER_ROOT + "/api/v1/users";

// post new user
export const postNewAdmin = (obj) => {
  return apiProcessor({
    url: userEP + "/register",
    method: "POST",
    data: obj,
  });
};

// login user
export const postLoginAdmin = (obj) => {
  return apiProcessor({
    url: userEP + "/login",
    method: "POST",
    data: obj,
  });
};
