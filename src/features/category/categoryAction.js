import {
  deleteBrandAxios,
  deleteCategory,
  deleteMaterialAxios,
  editBrandAxios,
  editCategory,
  editMaterialAxios,
  getCategory,
  getSubCategoryAxios,
  postCategory,
} from "./categoryAxios";
import { setBrand, setCategory, setMaterial } from "./categorySlice";

export const getCategoryAction = () => async (dispatch) => {
  const { category } = await getCategory();
  dispatch(setCategory(category));

  // const { subCategory } = await getSubCategory();
  // dispatch(setSubCategory(subCategory));
};

export const postCategoryAction =
  ({ obj, hideModalType, navigate, isSubCat }) =>
  async (dispatch) => {
    const { status } = await postCategory(obj, isSubCat);

    if (status === "success") {
      dispatch(getCategoryAction());
      isSubCat && dispatch(getSubCatAction());
      hideModalType();
      navigate("/admin/categories");
    }
  };

export const editCategoryAction =
  (obj, hideModal, navigate) => async (dispatch) => {
    const { status } = await editCategory(obj);

    if (status === "success") {
      dispatch(getCategoryAction());
      hideModal();
      navigate("/admin/categories");
    }
  };

export const deleteCategoryAction = (_id) => async (dispatch) => {
  const { status } = await deleteCategory(_id);

  if (status === "success") {
    dispatch(getCategoryAction());
  }
};

//=======================================SUb-Category (Brand / Material) ========================
// fetch all materials/ brands
export const getSubCatAction = () => async (dispatch) => {
  const { status, brands, materials } = await getSubCategoryAxios();
  if (status === "success") {
    dispatch(setBrand(brands));
    dispatch(setMaterial(materials));
  }
};

// edit brand
export const editBrandAction =
  (obj, hideModal, navigate) => async (dispatch) => {
    const { status } = await editBrandAxios(obj);
    if (status === "success") {
      dispatch(getSubCatAction());
      hideModal();
      navigate("/admin/categories");
    }
  };

// edit material
export const editMaterialAction =
  (obj, hideModal, navigate) => async (dispatch) => {
    const { status } = await editMaterialAxios(obj);
    if (status === "success") {
      dispatch(getSubCatAction());
      hideModal();
      navigate("/admin/categories");
    }
  };

// delete brand
export const deleteBrandAction = (_id) => async (dispatch) => {
  const { status } = await deleteBrandAxios(_id);

  if (status === "success") {
    dispatch(getSubCatAction());
  }
};

// delete material
export const deleteMaterialAction = (_id) => async (dispatch) => {
  const { status } = await deleteMaterialAxios(_id);

  if (status === "success") {
    dispatch(getSubCatAction());
  }
};
