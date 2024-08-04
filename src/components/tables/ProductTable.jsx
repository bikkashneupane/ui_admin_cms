import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProductAction,
  editProductAction,
} from "../../features/product/productAction";
import { setSelectedProduct } from "../../features/product/productSlice";

export const ProductTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.productInfo);
  const { category, subCategory } = useSelector((state) => state.categoryInfo);

  const handleStatusChange = (obj) => {
    dispatch(editProductAction(obj, navigate));
  };

  const handleOnEditProduct = (product) => {
    dispatch(setSelectedProduct(product));
    navigate("/admin/products/edit");
  };

  let active = 3;
  let items = [];

  for (let number = 1; number <= 5; number++) {
    items.push(
      <button
        key={number}
        className={`px-3 py-1 rounded-md ${
          number === active ? "bg-teal-500 text-white" : "bg-gray-200"
        }`}
      >
        {number}
      </button>
    );
  }

  return (
    <div>
      <div className="mb-4 text-lg font-semibold">
        {product?.length || 0} Product(s) found
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="bg-white border border-gray-200 overflow-scroll">
          <thead>
            <tr className="border">
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Thumbnail</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">SKU</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Quantity</th>
              <th className="px-4 py-2 border-b min-w-[200px]">
                Specification
              </th>
              <th className="px-4 py-2 border-b">Sales</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="border">
            {product &&
              product.map((item, i) => (
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
                              item?.status === "active" ? "inactive" : "active",
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
                      <span className="grid grid-cols-2">
                        <span className="font-semibold">Category</span>
                        {
                          category?.find((cat) => cat._id === item?.categoryId)
                            ?.title
                        }
                      </span>
                      <span className="grid grid-cols-2">
                        <span className="font-semibold">Brand</span>
                        {
                          subCategory
                            .find(
                              (subCat) =>
                                subCat.parentCategoryId ===
                                category.find(
                                  (cat) => cat._id === item.categoryId
                                )._id
                            )
                            .brand.find((brn) => brn._id === item.brandId).name
                        }
                      </span>
                      <span className="grid grid-cols-2">
                        <span className="font-semibold">Material</span>
                        {
                          subCategory
                            .find(
                              (subCat) =>
                                subCat.parentCategoryId ===
                                category.find(
                                  (cat) => cat._id === item.categoryId
                                )._id
                            )
                            .material.find((mat) => mat._id === item.materialId)
                            .name
                        }
                      </span>
                      <span className="grid grid-cols-2">
                        <span className="font-semibold">Gender</span>{" "}
                        {item?.gender}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {item?.sales?.salesPrice
                      ? `$${item?.sales?.salesPrice}`
                      : `-`}
                    <br />
                    {item?.sales?.salesStart && (
                      <span className="font-semibold">
                        {item?.sales?.salesStart
                          ?.slice(0, 10)
                          ?.replaceAll("-", "/")}{" "}
                        - <br />
                        {item?.sales?.salesEnd
                          ?.slice(0, 10)
                          .replaceAll("-", "/")}
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
      <div className="mt-4 flex justify-center space-x-2">{items}</div>
    </div>
  );
};
