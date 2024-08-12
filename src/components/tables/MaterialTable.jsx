import { useDispatch, useSelector } from "react-redux";
import { deleteMaterialAction } from "../../features/category/categoryAction";

const MaterialTable = ({
  showModal,
  setSelectedMaterial,
  editMaterialModalName,
}) => {
  const dispatch = useDispatch();
  const { materials } = useSelector((state) => state.categoryInfo);

  return (
    <div>
      <div className="mt-4 mb-2 px-1 text-gray-700">
        <span className="font-bold">{materials?.length || 0}</span> Material(s)
        found
      </div>

      <div className="overflow-x-scroll rounded-2xl shadow-lg mb-6">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Slug</th>
              <th className="py-2 px-4 text-left w-1/4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials &&
              materials?.map((item, i) => (
                <tr key={item?._id} className="border-b border-gray-200">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{item?.name}</td>
                  <td className="p-3">{item?.slug}</td>
                  <td className="p-3 flex gap-2 items-center">
                    <button
                      className="bg-yellow-500 text-white py-2 px-8 rounded hover:bg-yellow-600 transition"
                      onClick={() => {
                        setSelectedMaterial(item);
                        showModal(editMaterialModalName);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                      onClick={() => {
                        dispatch(deleteMaterialAction(item?._id));
                      }}
                    >
                      Delete
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
