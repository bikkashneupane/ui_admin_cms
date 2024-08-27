import { CategoryTable } from "../../components/tables/CategoryTable";
import { CustomModal } from "../../components/common/custom-modal/CustomModal";
import { useDispatch } from "react-redux";
import { postCategoryAction } from "../../features/user/category/categoryAction";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { AddNewSubCategory } from "../../components/form/AddNewSubCategory";

export const SubCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, showModal, hideModal } = useModal();

  const postCategory = (obj) =>
    dispatch(postCategoryAction(obj, hideModal, navigate));

  return (
    <div className="px-1">
      <h2 className="text-2xl font-bold mb-2">Sub Categories</h2>
      <hr className="mb-2" />
      <div className="text-right my-2">
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-800"
          onClick={showModal}
        >
          Add New Category
        </button>
      </div>

      <CategoryTable />

      {show && (
        <CustomModal
          title={"Add New Sub-Category"}
          show={show}
          hideModal={hideModal}
        >
          <AddNewSubCategory postCategory={postCategory} />
        </CustomModal>
      )}
    </div>
  );
};
