import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProductAction,
  editProductAction,
} from "../../features/product/productAction";
import { setSelectedProduct } from "../../features/product/productSlice";
import { Switch } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export const ProductTable = ({ pageProducts, totalProducts, startIndex }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category, brands, materials } = useSelector(
    (state) => state.categoryInfo
  );

  const handleStatusChange = (obj) => {
    dispatch(editProductAction(obj, navigate));
  };

  const handleOnEditProduct = (product) => {
    dispatch(setSelectedProduct(product));
    navigate("/admin/products/edit");
  };

  return (
    <div>
      <h1 className="mb-3 font-semibold">
        {totalProducts || 0} Product(s) found
      </h1>

      {pageProducts?.length > 0 && (
        <>
          <div className="overflow-x-scroll mb-6 rounded-md">
            <table className="min-w-full bg-[#1E1E1E] rounded-md">
              <thead>
                <tr className="bg-teal-800">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Thumbnail</th>
                  <th className="px-4 py-2 min-w-[200px]">Name</th>
                  <th className="px-4 py-2">SKU</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2 min-w-[200px]">Category</th>
                  <th className="px-4 py-2">Sales</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {pageProducts &&
                  pageProducts.map((item, i) => (
                    <tr key={item?._id} className="border-b border-gray-800">
                      <td className="px-4 py-2">{startIndex + i + 1}</td>

                      <td>
                        <div
                          className={`flex items-center gap-1 font-bold  ${
                            item?.status === "active"
                              ? "text-teal-600"
                              : "text-red-600"
                          }`}
                        >
                          <Switch
                            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition data-[checked]:bg-teal-600"
                            checked={item?.status === "active"}
                            onChange={() => {
                              handleStatusChange({
                                ...item,
                                status:
                                  item?.status === "active"
                                    ? "inactive"
                                    : "active",
                              });
                            }}
                          >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                          </Switch>
                          <span className="w-[50px]">
                            {item?.status?.toUpperCase()}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-2">
                        <img src={item?.thumbnail} alt="" className="w-24" />
                      </td>
                      <td className="px-4 py-2">{item?.name}</td>
                      <td className="px-4 py-2">{item?.sku}</td>
                      <td className="px-4 py-2">${item?.price}</td>
                      <td className="px-4 py-2">{item?.quantity}</td>
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1 text-sm">
                          {
                            category?.find(
                              (cat) => cat._id === item?.categoryId
                            )?.title
                          }
                          <span>
                            Brand:{" "}
                            {
                              brands?.find(
                                (brand) => brand?._id === item?.brandId
                              )?.name
                            }
                          </span>
                          <span>
                            Material:{" "}
                            {
                              materials?.find(
                                (material) => material?._id === item?.materialId
                              )?.name
                            }
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {item?.salesPrice ? `$${item?.salesPrice}` : `-`}
                        <br />
                        {item?.salesStart && (
                          <span>
                            {item?.salesStart
                              ?.slice(0, 10)
                              ?.replaceAll("-", "/")}{" "}
                            - <br />
                            {item?.salesEnd?.slice(0, 10).replaceAll("-", "/")}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {item?.description?.slice(0, 50)}...
                      </td>
                      <td className="px-4 py-2 flex gap-1">
                        <button
                          onClick={() => {
                            handleOnEditProduct(item);
                          }}
                          className="p-2 bg-gray-900 text-yellow-500 hover:text-white rounded hover:bg-yellow-600"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => {
                            dispatch(deleteProductAction(item?._id));
                          }}
                          className="p-2 bg-gray-900 hover:bg-red-500 hover:text-white rounded text-red-600"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
