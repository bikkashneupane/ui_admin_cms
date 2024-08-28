import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Pagination = ({
  totalPage,
  currentPage,
  setCurrentPage,
  totalResultsLength,
  startIndex,
  endIndex,
}) => {
  let items = [];

  for (let number = 1; number <= totalPage; number++) {
    items.push(
      <button
        key={number}
        className={`px-3 py-1 rounded-md ${
          number === currentPage
            ? "bg-teal-500 text-white"
            : "bg-gray-700 hover:bg-teal-600 hover:text-white"
        }`}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </button>
    );
  }
  return (
    <div className="flex justify-between items-baseline px-2">
      <div>
        <p className="text-sm">
          Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
          <span className="font-medium">
            {endIndex < totalResultsLength ? endIndex : totalResultsLength}
          </span>{" "}
          of <span className="font-medium">{totalResultsLength}</span> results
        </p>
      </div>
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-teal-600 hover:text-white focus:z-20 focus:outline-offset-0"
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
        </button>
        <div className="space-x-2 hidden md:block">{items}</div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-teal-600 hover:text-white focus:z-20 focus:outline-offset-0"
          disabled={currentPage === totalPage}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
