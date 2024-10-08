import { useSelector } from "react-redux";
import OrderChart from "../../components/charts/OrderChart";
import { FaUser } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { SiCashapp } from "react-icons/si";
import { TbCube } from "react-icons/tb";
import { AiOutlineMessage } from "react-icons/ai";
import OrderTable from "../../components/tables/OrderTable";
import { Link } from "react-router-dom";
import uselast7daysSales from "../../hooks/uselast7daysSales";
import useOrderStatus from "../../hooks/useOrderStatus";
import Last7DaysSale from "../../components/charts/Last7DaysSales";

export const Dashboard = () => {
  const { product } = useSelector((state) => state.productInfo);
  const { allOrders } = useSelector((state) => state.orderInfo);
  const { allUsers } = useSelector((state) => state.userInfo);
  const { reviews } = useSelector((state) => state.reviewInfo);

  const confirmedOrder = allOrders?.filter(
    (item) => item?.paymentStatus !== "pending"
  );

  const totalSales = confirmedOrder?.reduce(
    (acc, curr) => acc + curr?.amount,
    0
  );

  const { last7DaysSalesdata } = uselast7daysSales(confirmedOrder);
  const { orderChartData } = useOrderStatus(allOrders);

  return (
    <div className="text-gray-300 px-6">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-5 bg-[#1E1E1E] rounded-lg py-2">
        <Link
          to="/admin/orders"
          className="flex flex-col gap-2 justify-center items-center text-base cursor-pointer p-2 border-r-2 border-gray-800"
        >
          <SiCashapp className="w-6 h-6 text-green-500" />
          <div className="text-center text-sm md:text-base lg:text-lg ">
            <h1 className="font-semibold">$ {totalSales?.toLocaleString()}</h1>
            <p>Sales</p>
          </div>
        </Link>

        <Link
          to={"/admin/orders"}
          className="flex flex-col gap-2 justify-center items-center text-base cursor-pointer p-2 border-r-2 border-gray-700"
        >
          <FcSalesPerformance className="w-6 h-6" />
          <div className="text-center text-sm md:text-base lg:text-lg ">
            <h1 className="font-semibold">
              {confirmedOrder?.length?.toLocaleString()}
            </h1>
            <p>Orders</p>
          </div>
        </Link>

        <Link
          to={"/admin/products"}
          className="flex flex-col gap-2 justify-center items-center text-base cursor-pointer p-2 border-r-2 border-gray-700"
        >
          <TbCube className="w-6 h-6 text-teal-500" />
          <div className="text-center text-sm md:text-base lg:text-lg ">
            <h1 className="font-semibold">
              {product?.length?.toLocaleString()}
            </h1>
            <p>Products</p>
          </div>
        </Link>

        <Link
          to={"/admin/users"}
          className="flex flex-col gap-2 justify-center items-center text-base cursor-pointer p-2 border-r-2 border-gray-700"
        >
          <FaUser className="w-6 h-6 text-purple-500" />
          <div className="text-center">
            <h1 className="text-sm md:text-base lg:text-lg font-semibold">
              {allUsers?.length?.toLocaleString()}
            </h1>
            <p>Users</p>
          </div>
        </Link>

        <Link
          to={"/admin/reviews"}
          className="flex flex-col gap-2 justify-center items-center text-base cursor-pointer p-2"
        >
          <AiOutlineMessage className="w-6 h-6 text-green-500" />
          <div className="text-center text-sm md:text-base lg:text-lg ">
            <h1 className="font-semibold">
              {reviews?.length?.toLocaleString()}
            </h1>
            <p>Reviews</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-10">
        <div className="lg:col-span-3">
          <Last7DaysSale last7DaysSalesdata={last7DaysSalesdata} />
        </div>
        <div className="lg:col-span-2">
          <OrderChart orderChartData={orderChartData} />
        </div>
      </div>

      <div className="mt-16">
        <hr />

        <h1 className="text-2xl font-semibold my-4 text-center">
          Recent Orders
        </h1>
        <OrderTable pageOrders={allOrders?.slice(0, 5)} startIndex={0} />
        <Link
          to={"/admin/orders"}
          className="px-6 py-2 rounded-md bg-purple-600 hover:bg-purple-500"
        >
          Show More...
        </Link>
      </div>
    </div>
  );
};
