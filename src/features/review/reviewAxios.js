import { axiosProcessor } from "../../services/axiosHelper";

const reviewEP = import.meta.env.VITE_APP_SERVER_ROOT + "/api/v1/reviews";

// get review
export const getReview = () =>
  axiosProcessor({
    url: reviewEP,
    method: "GET",
    isPrivate: true,
  });

// post new review
export const postReview = (obj) =>
  axiosProcessor({
    url: reviewEP,
    method: "POST",
    data: obj,
    isPrivate: true,
    showToast: true,
  });

// edit review
export const editReview = (obj) =>
  axiosProcessor({
    url: reviewEP,
    method: "PUT",
    data: obj,
    isPrivate: true,
    showToast: true,
  });

// delete review
export const deleteReview = (_id) =>
  axiosProcessor({
    url: reviewEP + "/" + _id,
    method: "DELETE",
    isPrivate: true,
    showToast: true,
  });
