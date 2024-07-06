import { apiProcessor } from "../../services/axiosHelper";

const productEP = import.meta.env.VITE_APP_SERVER_ROOT + "/api/v1/products";

// get product
export const getProduct = () =>
  apiProcessor({
    url: productEP,
    method: "GET",
    isPrivate: true,
  });

// post new product
export const postProduct = (obj) =>
  apiProcessor({
    url: productEP,
    method: "POST",
    data: obj,
    isPrivate: true,
    showToast: true,
  });

// edit product
export const editProduct = (obj) =>
  apiProcessor({
    url: productEP,
    method: "PUT",
    data: obj,
    isPrivate: true,
    showToast: true,
  });

// delete product
export const deleteProduct = (_id) =>
  apiProcessor({
    url: productEP + "/" + _id,
    method: "DELETE",
    isPrivate: true,
    showToast: true,
  });
