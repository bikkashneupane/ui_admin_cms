import { Button, Form, Pagination, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteProductAction,
  editProductAction,
} from "../../features/product/productAction";
import { CustomModal } from "../common/custom-modal/CustomModal";
import { EditProduct } from "../form/EditProduct";

export const ProductTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, showModal, hideModal } = useModal();
  const [selectedProduct, setSelectedProduct] = useState({});
  const { product } = useSelector((state) => state.productInfo);
  const { category } = useSelector((state) => state.categoryInfo);

  const handleOnEditProduct = (obj) => {
    console.log(obj);
    dispatch(editProductAction(obj, hideModal, navigate));
  };

  return (
    <div>
      {show && (
        <CustomModal title={"Edit Product"} show={show} hideModal={hideModal}>
          <EditProduct
            selectedProduct={selectedProduct}
            handleOnEditProduct={handleOnEditProduct}
          />
        </CustomModal>
      )}

      <div>{product?.length || 0} Product(s) found</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Thumbnail</th>

            <th>Name</th>
            <th>SKU</th>
            <th>Slug</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Sales Price</th>
            <th>Sales Start</th>
            <th>Sales End</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product &&
            product.map((item, i) => (
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
                      onChange={() => {
                        handleOnEditProduct({
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
                <td>
                  <img
                    src={item?.thumbnail}
                    alt=""
                    style={{ width: "100px" }}
                  />
                </td>
                <td>{item?.title}</td>
                <td>{item?.sku}</td>
                <td>{item?.slug}</td>
                <td>${item?.price}</td>
                <td>{item?.quantity}</td>
                <td>
                  {
                    category.find((cat) => cat._id === item?.parentCategoryId)
                      ?.title
                  }
                </td>
                <td>{item?.salesPrice ? `$${item?.salesPrice}` : `-`}</td>
                <td>{item?.salesStart?.slice(0, 10) || `-`}</td>
                <td>{item?.salesEnd?.slice(0, 10) || `-`}</td>
                <td>{item?.description?.slice(0, 30)}...</td>
                <td className="d-flex gap-1">
                  <Button
                    variant="warning w-50"
                    onClick={() => {
                      setSelectedProduct(item);
                      showModal();
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger w-50"
                    onClick={() => {
                      dispatch(deleteProductAction(item?._id));
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="pagination">
        <Pagination>1</Pagination>
        <br />
      </div>
    </div>
  );
};
