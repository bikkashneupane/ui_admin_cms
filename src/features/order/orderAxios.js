// request client secret axios

import { axiosProcessor } from "../../services/axiosHelper";

const orderEP = import.meta.env.VITE_APP_SERVER_ROOT + "/api/v1/orders";

// fetch all my orders
export const fetchAllOrders = () => {
  return axiosProcessor({
    url: orderEP,
    method: "get",
    isPrivate: true,
  });
};
