import { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../../components/common/Pagination";

import OrderTable from "../../components/tables/OrderTable";

export const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { allOrders } = useSelector((state) => state.orderInfo);

  const ordersPerPage = 10;
  const totalPage = Math.ceil(allOrders?.length / ordersPerPage) || 0;
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const pageOrders = allOrders?.slice(startIndex, endIndex);

  return (
    <div className="mx-auto px-6">
      <h2 className="text-xl font-bold mb-2">Order History</h2>
      <hr className="mb-4" />
      <div className="mb-3 font-semibold text-right">
        {allOrders?.length || 0} Orders(s) found
      </div>

      <OrderTable pageOrders={pageOrders} startIndex={startIndex} />
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalResultsLength={allOrders?.length || 0}
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </div>
  );
};
