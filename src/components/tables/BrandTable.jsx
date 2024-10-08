import { useDispatch, useSelector } from "react-redux";
import { deleteBrandAction } from "../../features/category/categoryAction";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const BrandTable = ({ showModal, setSelectedBrand, editBrandModalName }) => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.categoryInfo);

  return (
    <div className="">
      <div className="mt-4 mb-2 px-1">
        <span className="font-bold">{brands?.length || 0}</span> Brand(s) found
      </div>

      <div className="overflow-x-scroll mb-6 rounded-md">
        <table className="min-w-full font-medium bg-[#1E1E1E] rounded-md">
          <thead>
            <tr className="bg-purple-800">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Slug</th>
              <th className="py-2 px-4 text-left w-1/4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands &&
              brands?.map((item, i) => (
                <tr
                  key={item?._id}
                  className="border-b border-gray-800 font-medium"
                >
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">{item?.name}</td>
                  <td className="py-2 px-4">{item?.slug}</td>
                  <td className="py-2 px-4 flex gap-2 items-center">
                    <button
                      className="bg-gray-900 text-yellow-500 p-2 rounded hover:bg-yellow-600 hover:text-white transition"
                      onClick={() => {
                        setSelectedBrand(item);
                        showModal(editBrandModalName);
                      }}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="bg-gray-900 text-red-500 hover:text-white p-2 rounded hover:bg-red-600 transition"
                      onClick={() => {
                        dispatch(deleteBrandAction(item?._id));
                      }}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandTable;
