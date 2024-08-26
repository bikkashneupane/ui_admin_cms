import { axiosProcessor } from "../../services/axiosHelper";

const categoryEP = import.meta.env.VITE_APP_SERVER_ROOT + "/api/v1/categories";
const subCategoryEP =
  import.meta.env.VITE_APP_SERVER_ROOT + "/api/v1/sub-categories";

// get category
export const getCategory = () =>
  axiosProcessor({
    url: categoryEP,
    method: "GET",
    isPrivate: true,
  });

// post new category
export const postCategory = (obj, isSubCat) => {
  return axiosProcessor({
    url: isSubCat ? subCategoryEP : categoryEP,
    method: "POST",
    data: obj,
    isPrivate: true,
    showToast: true,
  });
};

// edit category
export const editCategory = (obj) =>
  axiosProcessor({
    url: categoryEP,
    method: "PUT",
    data: obj,
    isPrivate: true,
    showToast: true,
  });

// delete category
export const deleteCategory = (_id) =>
  axiosProcessor({
    url: categoryEP + "/" + _id,
    method: "DELETE",
    isPrivate: true,
    showToast: true,
  });

// ========================================= SubCategory ================================
// get subcategory
// get category
export const getSubCategory = () =>
  axiosProcessor({
    url: categoryEP + "/sub-category",
    method: "GET",
    isPrivate: true,
  });

// get brands/ materials
export const getSubCategoryAxios = () =>
  axiosProcessor({
    url: subCategoryEP,
    method: "GET",
    isPrivate: true,
  });

// Edit Brand
export const editBrandAxios = (obj) =>
  axiosProcessor({
    url: subCategoryEP + "/edit-brand",
    method: "put",
    data: obj,
    isPrivate: true,
    showToast: true,
  });

// Edit Material
export const editMaterialAxios = (obj) =>
  axiosProcessor({
    url: subCategoryEP + "/edit-material",
    method: "put",
    data: obj,
    isPrivate: true,
    showToast: true,
  });

// delete brand
export const deleteBrandAxios = (_id) =>
  axiosProcessor({
    url: subCategoryEP + "/delete-brand/" + _id,
    method: "DELETE",
    isPrivate: true,
    showToast: true,
  });

// delete material
export const deleteMaterialAxios = (_id) =>
  axiosProcessor({
    url: subCategoryEP + "/delete-material/" + _id,
    method: "DELETE",
    isPrivate: true,
    showToast: true,
  });
