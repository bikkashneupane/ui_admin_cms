import { useDispatch, useSelector } from "react-redux";
import { EditCategory } from "../form/EditCategory";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import { CustomModal } from "../common/custom-modal/CustomModal";
import {
  deleteCategoryAction,
  editBrandAction,
  editCategoryAction,
  editMaterialAction,
} from "../../features/category/categoryAction";
import { useNavigate } from "react-router-dom";
import BrandTable from "./BrandTable";
import MaterialTable from "./MaterialTable";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import EditBrand from "../form/EditBrand";
import EditMaterial from "../form/EditMaterial";

const editCatModalName = "editCategory";
const editBrandModalName = "editBrand";
const editMaterialModalName = "editMaterial";

export const CategoryTable = () => {
  const { showModal, hideModal, isModalVisible } = useModal();
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedBrand, setSelectedBrand] = useState({});
  const [selectedMaterial, setSelectedMaterial] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.categoryInfo);

  const handleOnEditCategory = (obj) => {
    dispatch(
      editCategoryAction(obj, () => hideModal(editCatModalName), navigate)
    );
  };

  const handleOnEditBrand = (obj) => {
    dispatch(
      editBrandAction(obj, () => hideModal(editBrandModalName), navigate)
    );
  };

  const handleOnEditMaterial = (obj) => {
    dispatch(
      editMaterialAction(obj, () => hideModal(editMaterialModalName), navigate)
    );
  };

  return (
    <div className="">
      {/* Edit Category Modal */}
      {isModalVisible(editCatModalName) && (
        <CustomModal
          title={"Edit Category"}
          show={isModalVisible(editCatModalName)}
          hideModal={() => hideModal(editCatModalName)}
        >
          <EditCategory
            selectedCategory={selectedCategory}
            handleOnEditCategory={handleOnEditCategory}
          />
        </CustomModal>
      )}

      {/* Edit Brand Modal */}
      {isModalVisible(editBrandModalName) && (
        <CustomModal
          title={"Edit Brand"}
          show={isModalVisible(editBrandModalName)}
          hideModal={() => hideModal(editBrandModalName)}
        >
          <EditBrand
            selectedBrand={selectedBrand}
            handleOnEditBrand={handleOnEditBrand}
          />
        </CustomModal>
      )}

      {/* Edit Materia Modal */}
      {isModalVisible(editMaterialModalName) && (
        <CustomModal
          title={"Edit Material"}
          show={isModalVisible(editMaterialModalName)}
          hideModal={() => hideModal(editMaterialModalName)}
        >
          <EditMaterial
            selectedMaterial={selectedMaterial}
            handleOnEditMaterial={handleOnEditMaterial}
          />
        </CustomModal>
      )}

      {/* Category Table */}
      <Disclosure as="div" className="py-3 px-4 rounded-lg shadow-sm">
        <DisclosureButton
          as="button"
          className="w-full group flex justify-between items-center gap-2"
        >
          <h1 className="font-bold text-lg text-center text-teal-400">
            Categories
          </h1>
          <ChevronDownIcon className="w-5 group-data-[open]:rotate-180 font-extrabold" />
        </DisclosureButton>
        <DisclosurePanel>
          <div className="mt-4 mb-2 px-1 text-gray-700">
            <span className="font-bold">{category?.length || 0}</span>{" "}
            Categorie(s) found
          </div>
          <div className="overflow-x-scroll rounded-2xl shadow-lg mb-6">
            <table className="min-w-full bg-white border border-gray-200">
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
                                  item?.status === "active"
                                    ? "inactive"
                                    : "active",
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
                            showModal(editCatModalName);
                            setSelectedCategory(item);
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
        </DisclosurePanel>
      </Disclosure>

      {/* Brand Table */}
      <Disclosure as="div" className="mt-6 py-3 px-4 rounded-lg shadow-sm">
        <DisclosureButton
          as="button"
          className="w-full group flex  justify-between items-center gap-2"
        >
          <h1 className="font-bold text-lg text-center text-purple-600">
            Brands
          </h1>
          <ChevronDownIcon className="w-5 group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel>
          <BrandTable
            showModal={showModal}
            setSelectedBrand={setSelectedBrand}
            editBrandModalName={editBrandModalName}
          />
        </DisclosurePanel>
      </Disclosure>

      {/* Material Table */}
      <Disclosure as="div" className="mt-6 py-3 px-4 rounded-lg shadow-sm">
        <DisclosureButton
          as="button"
          className="w-full group flex  justify-between items-center gap-2"
        >
          <h1 className="font-bold text-lg text-center text-lime-600">
            Materials
          </h1>
          <ChevronDownIcon className="w-5 group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel>
          <MaterialTable
            showModal={showModal}
            setSelectedMaterial={setSelectedMaterial}
            editMaterialModalName={editMaterialModalName}
          />
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};
