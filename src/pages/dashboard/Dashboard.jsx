import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { product } = useSelector((state) => state.productInfo);
  const { allOrders } = useSelector((state) => state.orderInfo);
  const { allUsers } = useSelector((state) => state.userInfo);
  const { reviews } = useSelector((state) => state.reviewInfo);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
      <hr className="mb-10" />

      <div className="grid grid-cols-4 gap-10">
        <Link
          to={"/admin/products"}
          className="h-[100px] bg-purple-950 rounded-2xl flex flex-col justify-center items-center font-bold text-lg p-2"
        >
          Products: {product?.length}
        </Link>

        <Link
          to={"/admin/orders"}
          className="h-[100px] bg-teal-950 rounded-2xl flex flex-col justify-center items-center font-bold text-lg p-2"
        >
          Orders: {allOrders?.length}
        </Link>

        <Link
          to={"/admin/users"}
          className="h-[100px] bg-amber-950 rounded-2xl flex flex-col justify-center items-center font-bold text-lg p-2"
        >
          Users: {allUsers?.length}
        </Link>
        <Link
          to={"/admin/reviews"}
          className="h-[100px] bg-sky-950 rounded-2xl flex flex-col justify-center items-center font-bold text-lg p-2"
        >
          Reviews: {reviews?.length}
        </Link>
      </div>
    </div>
  );
};
