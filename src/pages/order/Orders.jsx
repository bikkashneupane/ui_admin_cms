import { useSelector } from "react-redux";

export const Orders = () => {
  const { allOrders } = useSelector((state) => state.orderInfo);
  const { allUsers } = useSelector((state) => state.userInfo);
  return (
    <div className="overflow-x-scroll mt-4 rounded-lg text-sm">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Order Id</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Customer</th>
            <th className="py-2 px-4 text-left">Products</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Placed Date</th>
            <th className="py-2 px-4 text-left w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allOrders &&
            allOrders.map((order, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-2 px-4">{i + 1}</td>
                <td className="py-2 px-4">{order?.orderId}</td>
                <td
                  className={`py-2 px-4 ${
                    order?.status === "processing"
                      ? "text-yellow-600"
                      : order?.status === "Succeeded"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order?.status}
                </td>
                <td className="py-2 px-4">
                  <span>
                    {
                      allUsers?.find((user) => user?._id === order?.userId)
                        ?.firstName
                    }{" "}
                    {
                      allUsers?.find((user) => user?._id === order?.userId)
                        ?.lastName
                    }
                  </span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex flex-col gap-1">
                    {order?.items?.map((product) => (
                      <div key={product?._id} className="">
                        <h1>{product?._id}</h1>
                        <h1>Quantity: {product?.quantity}</h1>
                        <h1>Amount: {product?.quantity * product?.price}</h1>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4">${order?.amount}</td>
                <td className="py-2 px-4">{order?.createdAt.slice(0, 10)}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white py-2 px-8 rounded hover:bg-yellow-600 transition"
                    //   onClick={() => {
                    //     setSelectedCategory(item);
                    //     showModal();
                    //   }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                    //   onClick={() => {
                    //     dispatch(deleteCategoryAction(item?._id));
                    //   }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
