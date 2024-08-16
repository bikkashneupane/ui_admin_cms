import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { ProductTable } from "../../components/tables/ProductTable";
import { getProductAction } from "../../features/product/productAction";

export const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productInfo);

  useEffect(() => {
    dispatch(getProductAction());
  }, [dispatch]);

  const productsPerPage = 5;
  const totalPage = Math.ceil(product?.length / productsPerPage) || 0;

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const pageProducts = product?.slice(startIndex, endIndex);

  return (
    <div className="mx-auto p-4 sm:px-6 md:px-8">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <hr className="mb-4 " />
      <div className="text-right">
        <Link
          to={"/admin/products/add"}
          onClick={() => {}}
          className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 focus:outline-none"
        >
          Add New Product
        </Link>
      </div>

      <ProductTable
        totalPage={totalPage}
        currentPage={currentPage}
        pageProducts={pageProducts}
        setCurrentPage={setCurrentPage}
        totalProducts={product?.length || 0}
      />
    </div>
  );
};
