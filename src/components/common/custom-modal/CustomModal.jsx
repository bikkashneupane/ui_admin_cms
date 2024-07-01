import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

export const CustomModal = ({ show, hideModal, title, children, ...rest }) => {
  return (
    <div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        {...rest}
      >
        <Modal.Header closeButton onClick={() => hideModal()}>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
};
