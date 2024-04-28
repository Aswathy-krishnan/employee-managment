import React from 'react'
import { Button, Modal } from 'react-bootstrap';

function DeletePopup({showDeletePopUp,setShowDeletePopUp,OnConfirmDeletePopUP}) {
  return (
    <Modal
        show={showDeletePopUp}
        size="md"
        onHide={() => setShowDeletePopUp(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this Employee detail??</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={OnConfirmDeletePopUP}>
            Confirm
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowDeletePopUp(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default DeletePopup
