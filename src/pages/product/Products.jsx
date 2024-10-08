import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProductTable } from "../../components/tables/ProductTable";
import Pagination from "../../components/common/Pagination";

export const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { product } = useSelector((state) => state.productInfo);

  const productsPerPage = 5;
  const totalPage = Math.ceil(product?.length / productsPerPage) || 0;

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const pageProducts = product?.slice(startIndex, endIndex);

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Products</h1>
        <Link
          to={"/admin/products/add"}
          onClick={() => {}}
          className="px-4 py-2 bg-teal-700 text-white font-semibold rounded-lg shadow hover:bg-teal-600 focus:outline-none"
        >
          Add New Product
        </Link>
      </div>

      <hr className="mt-2 mb-4" />
      <ProductTable
        totalPage={totalPage}
        pageProducts={pageProducts}
        totalProducts={product?.length || 0}
        startIndex={startIndex}
      />
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalResultsLength={product?.length || 0}
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </div>
  );
};
