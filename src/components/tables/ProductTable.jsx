import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProductAction,
  editProductAction,
} from "../../features/product/productAction";
import { setSelectedProduct } from "../../features/product/productSlice";

export const ProductTable = ({ pageProducts, totalProducts }) => {
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
      <div className="mb-3 text-lg font-semibold">
        {totalProducts || 0} Product(s) found
      </div>

      {pageProducts?.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full bg-white border border-gray-200 overflow-scroll">
              <thead>
                <tr className="border">
                  <th className="px-4 py-2 border-b">#</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Thumbnail</th>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">SKU</th>
                  <th className="px-4 py-2 border-b">Price</th>
                  <th className="px-4 py-2 border-b">Quantity</th>
                  <th className="px-4 py-2 border-b min-w-[200px]">Category</th>
                  <th className="px-4 py-2 border-b">Sales</th>
                  <th className="px-4 py-2 border-b">Description</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="border">
                {pageProducts &&
                  pageProducts.map((item, i) => (
                    <tr key={item?._id} className="border-b">
                      <td className="px-4 py-2">{i + 1}</td>
                      <td className="px-4 py-2">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
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
                            className="sr-only"
                          />
                          <span
                            className={`relative inline-block w-12 h-6 rounded-full ${
                              item?.status === "active"
                                ? "bg-green-600"
                                : "bg-red-400"
                            }`}
                          >
                            <span
                              className={`absolute left-0 top-0 w-6 h-6 transform rounded-full transition-transform ${
                                item?.status === "active" ? "translate-x-6" : ""
                              } bg-gray-100 border`}
                            ></span>
                          </span>
                          <span className="ml-3">
                            {item?.status?.toUpperCase()}
                          </span>
                        </label>
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
                      <td className="px-4 py-2 flex space-x-2">
                        <button
                          onClick={() => {
                            handleOnEditProduct(item);
                          }}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            dispatch(deleteProductAction(item?._id));
                          }}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
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
