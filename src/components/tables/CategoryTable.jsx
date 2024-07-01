import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { EditCategory } from "../form/EditCategory";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import { CustomModal } from "../common/custom-modal/CustomModal";

export const CategoryTable = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState({});
  const { show, showModal, hideModal } = useModal(false);
  const { category } = useSelector((state) => state.categoryInfo);

  const handleOnEdit = (item) => {
    setSelectedCategory(item);
    showModal();
  };

  return (
    <div>
      {show && (
        <CustomModal title={"Edit Category"} show={show} hideModal={hideModal}>
          <EditCategory selectedCategory={selectedCategory} />
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
                  {item?.status?.toUpperCase()}
                </td>
                <td>{item?.title}</td>
                <td>{item?.slug}</td>
                <td>
                  <Button
                    variant="warning w-50"
                    onClick={() => {
                      handleOnEdit(item);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
