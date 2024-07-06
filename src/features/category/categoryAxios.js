import { apiProcessor } from "../../services/axiosHelper";

const categoryEP = import.meta.env.VITE_APP_SERVER_ROOT + "/api/v1/categories";

// get category
export const getCategory = () => {
  return apiProcessor({
    url: categoryEP,
    method: "GET",
    isPrivate: true,
  });
};

// post new category
export const postCategory = (obj) =>
  apiProcessor({
    url: categoryEP,
    method: "POST",
    data: obj,
    isPrivate: true,
    showToast: true,
  });

// edit category
export const editCategory = (obj) =>
  apiProcessor({
    url: categoryEP,
    method: "PUT",
    data: obj,
    isPrivate: true,
    showToast: true,
  });

// delete category
export const deleteCategory = (_id) =>
  apiProcessor({
    url: categoryEP + "/" + _id,
    method: "DELETE",
    isPrivate: true,
    showToast: true,
  });
