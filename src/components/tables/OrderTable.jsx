import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrderAction,
  editOrderStatusAction,
} from "../../features/order/orderAction";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { CustomModal } from "../../components/common/CustomModal";
import { EditOrderStatus } from "../../components/form/EditOrderStatus";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const editOrderModalName = "editOrderModal";

const getStatusBgColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-600";
    case "confirmed":
      return "bg-sky-600";
    case "processing":
      return "bg-orange-600";
    case "shipped":
      return "bg-teal-600";
    case "delivered":
      return "bg-green-600";
    default:
      return "bg-gray-600";
  }
};

const OrderTable = ({ pageOrders, startIndex }) => {
  const [selectedOrder, setSelectedOrder] = useState({});

  const { showModal, hideModal, isModalVisible } = useModal();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsers } = useSelector((state) => state.userInfo);
  const { product } = useSelector((state) => state.productInfo);

  const handleOrderChange = (obj) => {
    console.log(obj);
    dispatch(
      editOrderStatusAction(obj, () => hideModal(editOrderModalName), navigate)
    );
  };

  return (
    <div>
      <div className="overflow-x-scroll mb-6 rounded-md">
        {isModalVisible(editOrderModalName) && (
          <CustomModal
            title={"Edit User Role"}
            show={isModalVisible(editOrderModalName)}
            hideModal={() => hideModal(editOrderModalName)}
          >
            <EditOrderStatus
              selectedOrder={selectedOrder}
              handleOrderChange={handleOrderChange}
            />
          </CustomModal>
        )}
        <table className="min-w-full bg-gray-800 rounded-md">
          <thead>
            <tr className="bg-teal-800 border-b border-gray-600">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Order Id</th>
              <th className="py-2 px-4 text-left">Payment Status</th>
              <th className="py-2 px-4 text-left">Customer</th>
              <th className="py-2 px-4 text-left">Products</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Placed Date</th>
              <th className="py-2 px-4 text-left">Delivery Status</th>
              <th className="py-2 px-4 text-left w-1/8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageOrders &&
              pageOrders?.map((order, i) => (
                <tr key={i} className="border-b border-gray-600">
                  <td className="py-2 px-4">{startIndex + i + 1}</td>
                  <td className="py-2 px-4">{order?.orderId}</td>
                  <td className="py-2 px-4">
                    <h1
                      className={`px-3 py-2 rounded-md text-xs font-semibold text-center text-white ${
                        order?.paymentStatus === "pending"
                          ? "bg-yellow-900"
                          : order?.paymentStatus === "Succeeded"
                          ? "bg-green-900"
                          : "bg-red-900"
                      }`}
                    >
                      {order?.paymentStatus?.toUpperCase()}
                    </h1>
                  </td>

                  <td className="py-2 px-4">
                    <span>
                      {
                        allUsers?.find((user) => user?._id === order?.userId)
                          ?.email
                      }
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex flex-col gap-1">
                      {order?.items?.map((item) => (
                        <div
                          key={item?._id}
                          className="flex gap-2 items-center"
                        >
                          <img
                            src={`${
                              product?.find((pr) => pr?._id === item?._id)
                                ?.thumbnail
                            }`}
                            alt=""
                            className="w-16"
                          />
                          <div className="">
                            <h1>Quantity: {item?.quantity}</h1>
                            <h1 className="text-green-600">
                              Amount: ${item?.quantity * item?.price}
                            </h1>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 px-4">${order?.amount}</td>
                  <td className="py-2 px-4">{order?.createdAt.slice(0, 10)}</td>
                  <td className="py-2 px-4">
                    <h1
                      className={`min-w-[120px] rounded-md px-3 py-2 ${getStatusBgColor(
                        order?.orderStatus
                      )} text-xs font-semibold text-center text-white`}
                    >
                      {order?.orderStatus?.toUpperCase()}
                    </h1>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          showModal(editOrderModalName);
                          setSelectedOrder(order);
                        }}
                        className="p-2 bg-gray-900 text-yellow-600 hover:text-white rounded hover:bg-yellow-800"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 bg-gray-900 hover:bg-red-800 hover:text-white rounded text-red-600"
                        onClick={() => dispatch(deleteOrderAction(order?._id))}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
