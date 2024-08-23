import { useSelector } from "react-redux";
import Stars from "../../components/common/Star";

export const Reviews = () => {
  const { reviews } = useSelector((state) => state.reviewInfo);
  const { product } = useSelector((state) => state.productInfo);
  console.log(product);
  return (
    <div className="overflow-x-scroll mt-4 rounded-lg text-sm">
      <div className="text-lg font-bold mb-4 text-center">
        Reviews
        <hr />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-center">Product</th>
            <th className="py-2 px-4 text-left">Customer</th>
            <th className="py-2 px-4 text-left">Ratings</th>
            <th className="py-2 px-4 text-left">Review</th>
            <th className="py-2 px-4 text-left">Placed Date</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews?.map((review, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="py-2 px-4">{i + 1}</td>
              <td
                className={`py-2 px-4 ${
                  review?.status === "active"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {review?.status}
              </td>
              <td className="py-2 px-4 space-y-2 text-xs flex flex-col justify-center items-center">
                <img
                  src={`${
                    product?.find((pr) => pr?._id === review?.productId)
                      ?.thumbnail
                  }`}
                  alt=""
                  className="w-24"
                />
                <h1>
                  {product?.find((pr) => pr?._id === review?.productId)?.name}
                </h1>
              </td>
              <td className="py-2 px-4">{review?.userName}</td>
              <td className="py-2 px-4">
                <Stars stars={review?.ratings} />
              </td>
              <td className="py-2 px-4 text-sm">
                <div>
                  <h1 className="font-semibold mb-2">{review?.title}</h1>
                  <p>{review?.message}</p>
                </div>
              </td>
              <td className="py-2 px-4">{review?.createdAt.slice(0, 10)}</td>
              <td className="py-2 px-4 space-x-2">
                <button className="bg-yellow-500 text-white py-2 px-8 rounded hover:bg-yellow-600 transition">
                  Edit
                </button>
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
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
