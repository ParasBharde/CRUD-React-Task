import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, onHide, onDelete }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        <p>If you delete this member then this action can not be undone?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onDelete}>
          Yes, Delete it
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
