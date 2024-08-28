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

// delete an order
export const deleteOrderAxios = (_id) => {
  return axiosProcessor({
    url: orderEP + "/" + _id,
    method: "delete",
    isPrivate: true,
    showToast: true,
  });
};

// edit order status (for delivery)
export const editOrderAxios = (data) => {
  return axiosProcessor({
    url: orderEP,
    method: "put",
    data,
    isPrivate: true,
    showToast: true,
  });
};
