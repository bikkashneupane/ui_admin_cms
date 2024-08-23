import { setReview } from "./reviewSlice";
import { deleteReview, editReview, getReview, postReview } from "./reviewAxios";

export const getReviewAction = () => async (dispatch) => {
  const { reviews } = await getReview();
  dispatch(setReview(reviews));
};

export const postReviewAction = (obj) => async (dispatch) => {
  const { status } = await postReview(obj);

  if (status === "success") {
    dispatch(getReviewAction());
  }
};

export const editReviewAction = (obj, navigate) => async (dispatch) => {
  const { status } = await editReview(obj);

  if (status === "success") {
    dispatch(getReviewAction());
    navigate("/admin/reviews");
  }
};

export const deleteReviewAction = (_id) => async (dispatch) => {
  const { status } = await deleteReview(_id);

  if (status === "success") {
    dispatch(getReviewAction());
  }
};
