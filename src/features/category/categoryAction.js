import {
  deleteCategory,
  editCategory,
  getCategory,
  getSubCategory,
  postCategory,
} from "./categoryAxios";
import { setCategory, setSubCategory } from "./categorySlice";

export const getCategoryAction = () => async (dispatch) => {
  const { category } = await getCategory();
  dispatch(setCategory(category));

  const { subCategory } = await getSubCategory();
  dispatch(setSubCategory(subCategory));
};

export const postCategoryAction =
  (obj, hideModal, navigate, isSubCat) => async (dispatch) => {
    const { status } = await postCategory(obj, isSubCat);

    if (status === "success") {
      dispatch(getCategoryAction());
      hideModal();
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
