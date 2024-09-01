import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MostPopular from "../../components/charts/MostPopular";
import OrderChart from "../../components/charts/OrderChart";

export const Dashboard = () => {
  const { product } = useSelector((state) => state.productInfo);
  const { allOrders } = useSelector((state) => state.orderInfo);
  const { allUsers } = useSelector((state) => state.userInfo);
  const { reviews } = useSelector((state) => state.reviewInfo);

  let orderChartData = [];

  for (let i = 0; i < allOrders?.length; i++) {
    const existingItem = orderChartData.find(
      (item) => item.name === allOrders[i]?.orderStatus
    );
    if (existingItem) {
      existingItem.total += 1;
    } else {
      orderChartData.push({ name: allOrders[i]?.orderStatus, total: 1 });
    }
  }

  return (
    <div className="text-gray-200">
      <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
      <hr className="mb-10" />

      <div className="grid grid-cols-4 gap-10">
        <Link
          to={"/admin/products"}
          className="h-[100px] bg-purple-600 rounded-2xl flex flex-col justify-center items-center font-bold text-lg p-2"
        >
          <h1 className="text-3xl font-bold">{product?.length}</h1>
          <p>Products</p>
        </Link>

        <Link
          to={"/admin/orders"}
          className="h-[100px] bg-teal-600 rounded-2xl flex flex-col justify-center items-center font-bold text-lg p-2"
        >
          <h1 className="text-3xl font-bold">{allOrders?.length}</h1>
          <p>Orders</p>
        </Link>

        <Link
          to={"/admin/users"}
          className="h-[100px] bg-amber-600 rounded-2xl flex flex-col justify-center items-center font-bold text-lg p-2"
        >
          <h1 className="text-3xl font-bold">{allUsers?.length}</h1>
          <p>Users</p>
        </Link>
        <Link
          to={"/admin/reviews"}
          className="h-[100px] bg-sky-600 rounded-2xl flex flex-col justify-center items-center font-bold text-lg p-2"
        >
          <h1 className="text-3xl font-bold">{reviews?.length}</h1>
          <p>Reviews</p>
        </Link>
      </div>

      <MostPopular />
      <OrderChart orderChartData={orderChartData} />
    </div>
  );
};
