import {
  deleteCategory,
  editCategory,
  getCategory,
  getSubCategory,
  getSubCategoryAxios,
  postCategory,
} from "./categoryAxios";
import {
  setBrand,
  setCategory,
  setMaterial,
  setSubCategory,
} from "./categorySlice";

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

// fetch all brands
