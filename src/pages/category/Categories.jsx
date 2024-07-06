import { Button } from "react-bootstrap";
import { CategoryTable } from "../../components/tables/CategoryTable";
import { CustomModal } from "../../components/common/custom-modal/CustomModal";
import { AddNewCategory } from "../../components/form/AddNewCategory";
import { useDispatch } from "react-redux";
import { postCategoryAction } from "../../features/user/category/categoryAction";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";

export const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, showModal, hideModal } = useModal();

  const postCategory = (title) =>
    dispatch(postCategoryAction({ title }, hideModal, navigate));

  return (
    <div>
      <h2>Categories</h2>
      <hr />
      <div className="text-end mb-3">
        <Button
          className="btn-primary"
          onClick={() => {
            showModal();
          }}
        >
          Add New Category
        </Button>
      </div>

      <CategoryTable />

      {show && (
        <CustomModal
          title={"Add New Category"}
          show={show}
          hideModal={hideModal}
        >
          <AddNewCategory postCategory={postCategory} />
        </CustomModal>
      )}
    </div>
  );
};
