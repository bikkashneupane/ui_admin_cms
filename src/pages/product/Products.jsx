import { Button } from "react-bootstrap";
import { CustomModal } from "../../components/common/custom-modal/CustomModal";
import { useEffect } from "react";
import { AddNewProduct } from "../../components/form/AddNewProduct";
import { useDispatch } from "react-redux";

import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { ProductTable } from "../../components/tables/ProductTable";
import {
  getProductAction,
  postProductAction,
} from "../../features/product/productAction";

export const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, showModal, hideModal } = useModal();

  useEffect(() => {
    dispatch(getProductAction());
  }, [dispatch]);

  const postProduct = (obj) => {
    dispatch(postProductAction(obj, hideModal, navigate));
  };

  return (
    <div>
      <h2>Products</h2>
      <hr />
      <div className="text-end mb-3">
        <Button
          className="btn-primary"
          onClick={() => {
            showModal();
          }}
        >
          Add New Product
        </Button>
      </div>

      <ProductTable />

      {show && (
        <CustomModal
          title={"Add New Product"}
          show={show}
          hideModal={hideModal}
        >
          <AddNewProduct postProduct={postProduct} />
        </CustomModal>
      )}
    </div>
  );
};
