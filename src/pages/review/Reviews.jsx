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
  const { allUsers } = useSelector((state) => state.userInfo);

  console.log(reviews);
  const handleStatusChange = (review) => {
    const { _id, status } = review;
    const newStatus = status === "active" ? "inactive" : "active";
    const updateObj = { _id, status: newStatus };

    dispatch(editReviewAction(updateObj, navigate));
  };
  return (
    <div className="mx-auto px-6 py-1">
      <h2 className="text-2xl font-bold mb-2">Reviews</h2>
      <hr className="mb-10 " />

      <div className="mb-3 font-semibold">
        {reviews?.length || 0} Reviews(s) found
      </div>

      <div className="overflow-x-scroll mb-6 rounded-md">
        <table className="min-w-full bg-gray-800 rounded-md">
          <thead>
            <tr className="bg-teal-800 border-b border-gray-600">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-center">Product</th>
              <th className="py-2 px-4 text-left">Customer</th>
              <th className="py-2 px-4 text-left">Ratings</th>
              <th className="py-2 px-4 text-left">Review</th>
              <th className="py-2 px-4 text-left w-1/6">Order Placed</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.map((review, i) => (
              <tr key={i} className="border-b border-gray-600">
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
                    className="w-20"
                  />
                  <h1>
                    {product?.find((pr) => pr?._id === review?.productId)?.name}
                  </h1>
                </td>
                <td className="py-2 px-4">
                  {
                    allUsers?.find((user) => user?._id === review?.userId)
                      ?.email
                  }
                </td>
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
    </div>
  );
};
