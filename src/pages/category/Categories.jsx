import { Button } from "react-bootstrap";
import { CategoryTable } from "../../components/tables/CategoryTable";
import { CustomModal } from "../../components/common/custom-modal/CustomModal";
import { useEffect, useState } from "react";
import { AddNewCategory } from "../../components/form/AddNewCategory";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../../redux-store/system-slice/systemSlice";
import { getCategoryAction } from "../../features/user/category/categoryAction";
import { useModal } from "../../hooks/useModal";

export const Categories = () => {
  const dispatch = useDispatch();
  const { show, handleOnShow, handleOnHide } = useModal(false);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  return (
    <div>
      <h2>Categories</h2>
      <hr />
      <div className="text-end mb-3">
        <Button
          className="btn-primary"
          onClick={() => {
            handleOnShow();
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
          handleOnHide={handleOnHide}
        >
          <AddNewCategory />
        </CustomModal>
      )}
    </div>
  );
};
