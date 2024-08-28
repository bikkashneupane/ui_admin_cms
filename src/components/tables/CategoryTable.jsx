import { useDispatch, useSelector } from "react-redux";
import { EditCategory } from "../form/EditCategory";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
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
  Switch,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import EditBrand from "../form/EditBrand";
import EditMaterial from "../form/EditMaterial";
import { CustomModal } from "../common/CustomModal";

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
          className="bg-gray-800 flex max-w-min lg:max-w-full lg:justify-center md:gap-16 lg:flex-row  px-2 py-2 rounded-md bg-opacity-90"
        >
          <Tab className="text-teal-500 data-[selected]:bg-teal-700 data-[selected]:text-white font-semibold px-6 py-2 rounded-md">
            Categories
          </Tab>
          <Tab className="text-purple-500 data-[selected]:bg-purple-700 data-[selected]:text-white font-bold px-6 py-2 rounded-md">
            Brands
          </Tab>
          <Tab className="text-lime-500 data-[selected]:bg-lime-700 data-[selected]:text-white font-bold px-6 py-2 rounded-md">
            Materials
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="mt-4 mb-2 px-1">
              <span className="font-bold">{category?.length || 0}</span>{" "}
              Categorie(s) found
            </div>
            <div className="overflow-x-scroll mb-6 rounded-md">
              <table className="min-w-full font-medium bg-gray-800 rounded-md">
                <thead>
                  <tr className="bg-teal-800 border-b border-gray-600">
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
                      <tr key={item?._id} className="border-b border-gray-600">
                        <td className="py-2 px-4">{i + 1}</td>
                        <td>
                          <div
                            className={`flex items-center gap-1 font-bold  ${
                              item?.status === "active"
                                ? "text-teal-600"
                                : "text-red-600"
                            }`}
                          >
                            <Switch
                              className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition data-[checked]:bg-teal-600"
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
                            >
                              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                            </Switch>
                            <span className="w-[50px]">
                              {item?.status?.toUpperCase()}
                            </span>
                          </div>
                        </td>

                        <td className="py-2 px-4">{item?.title}</td>
                        <td className="py-2 px-4">{item?.slug}</td>
                        <td className="py-2 px-4 flex gap-2 items-center">
                          <button
                            className="bg-gray-900 text-yellow-500 py-2 px-8 rounded hover:bg-yellow-600 hover:text-white transition"
                            onClick={() => {
                              showModal(editCatModalName);
                              setSelectedCategory(item);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-gray-900 text-red-500 hover:text-white py-2 px-4 rounded hover:bg-red-600 transition"
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
