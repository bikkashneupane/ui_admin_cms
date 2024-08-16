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
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
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

      <TabGroup>
        <TabList
          as="div"
          className="bg-gradient-to-r from-purple-900 via-teal-900  to-lime-900 flex flex-col max-w-min lg:max-w-full lg:justify-center md:gap-16 lg:flex-row  px-2 py-2 rounded-md shadow-lg bg-opacity-90"
        >
          <Tab className="text-teal-500 data-[selected]:bg-teal-700 data-[selected]:text-white font-bold text-lg px-6 py-2 rounded-md shadow-lg">
            Categories
          </Tab>
          <Tab className="text-purple-500 data-[selected]:bg-purple-700 data-[selected]:text-white font-bold text-lg px-6 py-2 rounded-md shadow-lg">
            Brands
          </Tab>
          <Tab className="text-lime-500 data-[selected]:bg-lime-700 data-[selected]:text-white font-bold text-lg px-6 py-2 rounded-md shadow-lg">
            Materials
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="mt-4 mb-2 px-1 text-gray-700">
              <span className="font-bold">{category?.length || 0}</span>{" "}
              Categorie(s) found
            </div>
            <div className="overflow-x-scroll rounded-2xl shadow-lg mb-6">
              <table className="min-w-full bg-white border border-gray-200 font-medium">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="py-2 px-4 text-left">#</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Title</th>
                    <th className="py-2 px-4 text-left">Slug</th>
                    <th className="py-2 px-4 text-left w-1/5">Actions</th>
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
                                  item?.status === "active"
                                    ? "translate-x-6"
                                    : ""
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
          </TabPanel>
          <TabPanel>
            <BrandTable
              showModal={showModal}
              setSelectedBrand={setSelectedBrand}
              editBrandModalName={editBrandModalName}
            />
          </TabPanel>
          <TabPanel>
            <MaterialTable
              showModal={showModal}
              setSelectedMaterial={setSelectedMaterial}
              editMaterialModalName={editMaterialModalName}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};
