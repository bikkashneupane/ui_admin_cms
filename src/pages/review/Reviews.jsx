import { useDispatch, useSelector } from "react-redux";
import Stars from "../../components/common/Star";
import { Switch } from "@headlessui/react";
import { editReviewAction } from "../../features/review/reviewAction";
import { useNavigate } from "react-router-dom";

export const Reviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reviews } = useSelector((state) => state.reviewInfo);
  const { product } = useSelector((state) => state.productInfo);

  const handleStatusChange = (review) => {
    const { _id, status } = review;
    const newStatus = status === "active" ? "inactive" : "active";
    const updateObj = { _id, status: newStatus };

    dispatch(editReviewAction(updateObj, navigate));
  };
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
          </tr>
        </thead>
        <tbody>
          {reviews?.map((review, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="py-2 px-4">{i + 1}</td>
              <td className="py-2 px-4">
                <div
                  className={`flex items-center gap-1 font-bold  ${
                    review?.status === "active"
                      ? "text-teal-600"
                      : "text-red-600"
                  }`}
                >
                  <Switch
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-teal-600"
                    name="review-status"
                    checked={review?.status === "active"}
                    onChange={() => handleStatusChange(review)}
                  >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                  </Switch>
                  {review?.status?.toUpperCase()}
                </div>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
