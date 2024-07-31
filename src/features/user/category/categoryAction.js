import {
  deleteCategory,
  editCategory,
  getCategory,
  postCategory,
} from "./categoryAxios";
import { setCategory } from "./categorySlice";

export const getCategoryAction = () => async (dispatch) => {
  const { category } = await getCategory();
  dispatch(setCategory(category));
};

export const postCategoryAction =
  (obj, hideModal, navigate, isSubCat) => async (dispatch) => {
    // depending on subCat = true/false make necessary changes
    const { status } = await postCategory(obj);

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
