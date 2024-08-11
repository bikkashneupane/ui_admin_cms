import { apiProcessor } from "../../services/axiosHelper";

const categoryEP = import.meta.env.VITE_APP_SERVER_ROOT + "/api/v1/categories";
const subCategoryEP =
  import.meta.env.VITE_APP_SERVER_ROOT + "/api/v1/sub-categories";

// get category
export const getCategory = () =>
  apiProcessor({
    url: categoryEP,
    method: "GET",
    isPrivate: true,
  });

// post new category
export const postCategory = (obj, isSubCat) => {
  console.log(obj, isSubCat);
  return apiProcessor({
    url: isSubCat ? subCategoryEP : categoryEP,
    method: "POST",
    data: obj,
    isPrivate: true,
    showToast: true,
  });
};

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

// ========================================= SubCategory ================================
// get subcategory
// get category
export const getSubCategory = () =>
  apiProcessor({
    url: categoryEP + "/sub-category",
    method: "GET",
    isPrivate: true,
  });

// get brands/ materials
export const getSubCategoryAxios = () =>
  apiProcessor({
    url: subCategoryEP,
    method: "GET",
    isPrivate: true,
  });
