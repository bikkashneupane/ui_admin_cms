import { CategoryTable } from "../../components/tables/CategoryTable";
import { CustomModal } from "../../components/common/custom-modal/CustomModal";
import { AddNewCategory } from "../../components/form/AddNewCategory";
import { useDispatch } from "react-redux";
import { postCategoryAction } from "../../features/user/category/categoryAction";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { AddNewSubCategory } from "../../components/form/AddNewSubCategory";
import { useState } from "react";

export const Categories = () => {
  const [subCat, setSubCat] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, showModal, hideModal } = useModal();

  const postCategory = (obj) => {
    dispatch(postCategoryAction(obj, hideModal, navigate));
  };

  const postSubCategory = (obj) => {
    dispatch(postCategoryAction(obj, hideModal, navigate, { isSubCat: true }));
  };

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-20">
        <h2 className="text-2xl font-bold mb-2">Categories</h2>
        <hr className="mb-2" />
        <div className="my-2 flex gap-2 justify-end">
          <button
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-800"
            onClick={showModal}
          >
            Add New Category
          </button>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-teal-800"
            onClick={() => {
              showModal();
              setSubCat(true);
            }}
          >
            Add New Sub Category
          </button>
        </div>

        <CategoryTable />

        {show && !subCat ? (
          <CustomModal
            title={"Add New Category"}
            show={show}
            hideModal={hideModal}
          >
            <AddNewCategory postCategory={postCategory} />
          </CustomModal>
        ) : (
          <CustomModal
            title={"Add New Sub Category"}
            show={show}
            setSubCat={setSubCat}
            hideModal={hideModal}
          >
            <AddNewSubCategory postSubCategory={postSubCategory} />
          </CustomModal>
        )}
      </div>
    </div>
  );
};
