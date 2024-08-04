import { useDispatch, useSelector } from "react-redux";
import { EditCategory } from "../form/EditCategory";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import { CustomModal } from "../common/custom-modal/CustomModal";
import {
  deleteCategoryAction,
  editCategoryAction,
} from "../../features/user/category/categoryAction";
import { useNavigate } from "react-router-dom";

export const CategoryTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, showModal, hideModal } = useModal();
  const [selectedCategory, setSelectedCategory] = useState({});
  const { category } = useSelector((state) => state.categoryInfo);

  const handleOnEditCategory = (obj) => {
    dispatch(editCategoryAction(obj, hideModal, navigate));
  };

  return (
    <div className="">
      {show && (
        <CustomModal title={"Edit Category"} show={show} hideModal={hideModal}>
          <EditCategory
            selectedCategory={selectedCategory}
            handleOnEditCategory={handleOnEditCategory}
          />
        </CustomModal>
      )}

      <div className="mb-4 text-gray-700">
        <span className="font-bold">{category?.length || 0}</span> Categorie(s)
        found
      </div>

      <div className="overflow-x-scroll rounded-2xl shadow-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Slug</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {category &&
              category.map((item, i) => (
                <tr key={item?._id} className="border-b border-gray-200">
                  <td className="p-3">{i + 1}</td>
                  <td
                    className={`p-3 ${
                      item?.status === "active"
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }`}
                  >
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item?.status === "active"}
                        onChange={() => {
                          handleOnEditCategory({
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
                  <td className="p-3">{item?.title}</td>
                  <td className="p-3">{item?.slug}</td>
                  <td className="p-3 flex gap-2 items-center">
                    <button
                      className="bg-yellow-500 text-white py-2 px-8 rounded hover:bg-yellow-600 transition"
                      onClick={() => {
                        setSelectedCategory(item);
                        showModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                      onClick={() => {
                        dispatch(deleteCategoryAction(item?._id));
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
