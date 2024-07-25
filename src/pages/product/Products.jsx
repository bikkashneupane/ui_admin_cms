import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { ProductTable } from "../../components/tables/ProductTable";
import { getProductAction } from "../../features/product/productAction";

export const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductAction());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <hr className="mb-4 " />
      <div className="text-right mb-4">
        <Link
          to={"/admin/products/add"}
          onClick={() => {}}
          className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 focus:outline-none"
        >
          Add New Product
        </Link>
      </div>

      <ProductTable />
    </div>
  );
};
