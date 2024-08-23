import { fetchAllOrders } from "./orderAxios";
import { setAllOrders } from "./orderSlice";

// fetch all products
export const fetchAllOrdersAction = () => async (dispatch) => {
  const { orders } = await fetchAllOrders();
  dispatch(setAllOrders(orders ?? []));
};
