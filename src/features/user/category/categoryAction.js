import { setShowModal } from "../../../redux-store/system-slice/systemSlice";
import { getCategory, postCategory } from "./categoryAxios";
import { setCategory } from "./categorySlice";

export const postCategoryAction = (obj) => async (dispatch) => {
  const { status } = await postCategory(obj);

  if (status === "success") {
    dispatch(getCategoryAction());
    dispatch(setShowModal(false));
  }
};

export const getCategoryAction = () => async (dispatch) => {
  const { category } = await getCategory();
  dispatch(setCategory(category));
};
