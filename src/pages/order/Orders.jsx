import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/common/Pagination";
import { deleteOrderAction } from "../../features/order/orderAction";

export const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const { allOrders } = useSelector((state) => state.orderInfo);
  const { allUsers } = useSelector((state) => state.userInfo);
  const { product } = useSelector((state) => state.productInfo);

  const ordersPerPage = 10;
  const totalPage = Math.ceil(allOrders?.length / ordersPerPage) || 0;
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const pageOrders = allOrders?.slice(startIndex, endIndex);

  return (
    <div className="mx-auto px-6 py-1">
      <h2 className="text-2xl font-bold mb-2">Orders</h2>
      <hr className="mb-10 " />
      <div className="mb-3 font-semibold">
        {allOrders?.length || 0} Orders(s) found
      </div>

      <div className="overflow-x-scroll mb-6 rounded-md">
        <table className="min-w-full bg-gray-800 rounded-md">
          <thead>
            <tr className="bg-teal-800 border-b border-gray-600">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Order Id</th>
              <th className="py-2 px-4 text-left">Payment Status</th>
              <th className="py-2 px-4 text-left">Delivery Status</th>
              <th className="py-2 px-4 text-left">Customer</th>
              <th className="py-2 px-4 text-left">Products</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Placed Date</th>
              <th className="py-2 px-4 text-left w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageOrders &&
              pageOrders.map((order, i) => (
                <tr key={i} className="border-b border-gray-600">
                  <td className="py-2 px-4">{startIndex + i + 1}</td>
                  <td className="py-2 px-4">{order?.orderId}</td>
                  <td
                    className={`py-2 px-4 ${
                      order?.paymentStatus === "pending"
                        ? "text-yellow-600"
                        : order?.paymentStatus === "Succeeded"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order?.paymentStatus}
                  </td>
                  <td
                    className={`py-2 px-4 ${
                      order?.orderStatus === "delivered"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order?.orderStatus}
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
                  <td className="py-2 px-4 flex gap-2">
                    <button className="px-6 py-2 bg-gray-900 text-yellow-600 hover:text-white rounded hover:bg-yellow-800">
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 bg-gray-900 hover:bg-red-800 hover:text-white rounded text-red-600"
                      onClick={() => dispatch(deleteOrderAction(order?._id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalResultsLength={allOrders?.length || 0}
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </div>
  );
};
