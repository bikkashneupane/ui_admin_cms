import { useDispatch, useSelector } from "react-redux";
import { deleteMaterialAction } from "../../features/category/categoryAction";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const MaterialTable = ({
  showModal,
  setSelectedMaterial,
  editMaterialModalName,
}) => {
  const dispatch = useDispatch();
  const { materials } = useSelector((state) => state.categoryInfo);

  return (
    <div>
      <div className="mt-4 mb-2 px-1">
        <span className="font-bold">{materials?.length || 0}</span> Material(s)
        found
      </div>

      <div className="overflow-x-scroll mb-6 rounded-md">
        <table className="min-w-full font-medium bg-[#1E1E1E] rounded-md">
          <thead>
            <tr className="bg-lime-800">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Slug</th>
              <th className="py-2 px-4 text-left w-1/4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials &&
              materials?.map((item, i) => (
                <tr key={item?._id} className="border-b border-gray-800">
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">{item?.name}</td>
                  <td className="py-2 px-4">{item?.slug}</td>
                  <td className="py-2 px-4 flex gap-2 items-center">
                    <button
                      className="bg-gray-900 text-yellow-500 p-2 rounded hover:bg-yellow-600 hover:text-white transition"
                      onClick={() => {
                        setSelectedMaterial(item);
                        showModal(editMaterialModalName);
                      }}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="bg-gray-900 text-red-500 hover:text-white p-2 rounded hover:bg-red-600 transition"
                      onClick={() => {
                        dispatch(deleteMaterialAction(item?._id));
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

export default MaterialTable;
