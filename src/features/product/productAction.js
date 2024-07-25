import { setProduct } from "./productSlice";
import {
  deleteProduct,
  editProduct,
  getProduct,
  postProduct,
} from "./productAxios";

export const getProductAction = () => async (dispatch) => {
  const { product } = await getProduct();
  dispatch(setProduct(product));
};

export const postProductAction =
  (obj, hideModal, navigate) => async (dispatch) => {
    const { status } = await postProduct(obj);

    if (status === "success") {
      dispatch(getProductAction());
      hideModal();
      navigate("/admin/products");
    }
  };

export const editProductAction = (obj, navigate) => async (dispatch) => {
  const { status } = await editProduct(obj);

  if (status === "success") {
    dispatch(getProductAction());
    navigate("/admin/products");
  }
};

export const deleteProductAction = (_id) => async (dispatch) => {
  const { status } = await deleteProduct(_id);

  if (status === "success") {
    dispatch(getProductAction());
  }
};
