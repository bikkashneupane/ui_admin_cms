import { deleteOrderAxios, editOrderAxios, fetchAllOrders } from "./orderAxios";
import { setAllOrders } from "./orderSlice";

// fetch all products
export const fetchAllOrdersAction = () => async (dispatch) => {
  const { orders } = await fetchAllOrders();
  dispatch(setAllOrders(orders ?? []));
};

// edit order status (delivery)
export const editOrderStatusAction =
  (obj, hideModal, navigate) => async (dispatch) => {
    const { status } = await editOrderAxios(obj);
    if (status === "success") {
      dispatch(fetchAllOrdersAction());
      hideModal();
      navigate("/admin/orders");
    }
  };

// delete order action
export const deleteOrderAction = (_id) => async (dispatch) => {
  const { status } = await deleteOrderAxios(_id);
  if (status === "success") {
    dispatch(fetchAllOrdersAction());
  }
};
