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
    <div className="mx-auto p-4 sm:px-6 md:px-8">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <hr className="mb-4 " />
      <div className="text-right">
        <Link
          to={"/admin/products/add"}
          onClick={() => {}}
          className="px-4 py-3 bg-teal-700 text-white font-semibold rounded-lg shadow hover:bg-teal-600 focus:outline-none"
        >
          Add New Product
        </Link>
      </div>

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
