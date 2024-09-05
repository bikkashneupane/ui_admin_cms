import { CategoryTable } from "../../components/tables/CategoryTable";
import { CustomModal } from "../../components/common/CustomModal";
import { AddNewCategory } from "../../components/form/AddNewCategory";
import { useDispatch } from "react-redux";
import { postCategoryAction } from "../../features/category/categoryAction";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { AddNewBrand } from "../../components/form/AddNewBrand";
import { AddNewMaterial } from "../../components/form/AddNewMaterial";

export const Categories = () => {
  const { showModal, hideModal, isModalVisible } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // common logic for category / brand / material
  const postCategory = (obj, modalType, isSubCat) => {
    dispatch(
      postCategoryAction({
        obj,
        hideModalType: () => hideModal(modalType),
        navigate,
        isSubCat,
      })
    );
  };

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Categories</h2>
        <div className="flex gap-2 font-semibold">
          <button
            className="bg-teal-700 px-4 py-2 rounded hover:bg-teal-800"
            onClick={() => showModal("addCategory")}
          >
            Add New Category
          </button>
          <button
            className="bg-purple-700  px-4 py-2 rounded hover:bg-purple-800"
            onClick={() => showModal("addBrand")}
          >
            Add New Brand
          </button>
          <button
            className="bg-lime-700  px-4 py-2 rounded hover:bg-lime-800"
            onClick={() => showModal("addMaterial")}
          >
            Add New Material
          </button>
        </div>
      </div>

      <hr className="mb-12 mt-2" />
      {/* Add New Category Modal */}
      {isModalVisible("addCategory") && (
        <CustomModal
          title={"New Category"}
          show={isModalVisible("addCategory")}
          hideModal={() => hideModal("addCategory")}
        >
          <AddNewCategory postCategory={postCategory} />
        </CustomModal>
      )}
      {/* Add New Brand Modal */}
      {isModalVisible("addBrand") && (
        <CustomModal
          title={"New Brand"}
          show={isModalVisible("addBrand")}
          hideModal={() => hideModal("addBrand")}
        >
          <AddNewBrand postCategory={postCategory} />
        </CustomModal>
      )}
      {/* Add New Material Modal */}
      {isModalVisible("addMaterial") && (
        <CustomModal
          title={"New Material"}
          show={isModalVisible("addMaterial")}
          hideModal={() => hideModal("addMaterial")}
        >
          <AddNewMaterial postCategory={postCategory} />
        </CustomModal>
      )}
      <CategoryTable />
    </div>
  );
};
