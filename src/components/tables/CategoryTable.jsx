import { Button, Form, Table } from "react-bootstrap";
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
    <div>
      {show && (
        <CustomModal title={"Edit Category"} show={show} hideModal={hideModal}>
          <EditCategory
            selectedCategory={selectedCategory}
            handleOnEditCategory={handleOnEditCategory}
          />
        </CustomModal>
      )}

      <div>{category?.length || 0} Categories found</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {category &&
            category.map((item, i) => (
              <tr key={item?._id}>
                <td>{i + 1}</td>
                <td
                  className={
                    item?.status === "success"
                      ? "text-success fw-bold"
                      : "text-danger fw-bold"
                  }
                >
                  <Form.Group>
                    <Form.Check
                      name="status"
                      type="switch"
                      id="custom-switch"
                      checked={item?.status === "active"}
                      label={item?.status?.toUpperCase()}
                      onClick={() => {
                        handleOnEditCategory({
                          ...item,
                          status:
                            item?.status === "active" ? "inactive" : "active",
                        });
                      }}
                      className={
                        item?.status === "active"
                          ? "text-success mb-3"
                          : "text-danger mb-3"
                      }
                    />
                  </Form.Group>
                </td>
                <td>{item?.title}</td>
                <td>{item?.slug}</td>
                <td className="d-flex gap-1">
                  <Button
                    variant="warning w-50"
                    onClick={() => {
                      setSelectedCategory(item);
                      showModal();
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger w-50"
                    onClick={() => {
                      dispatch(deleteCategoryAction(item?._id));
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
