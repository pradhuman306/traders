import React from "react";

function ConfirmModal(props) {
  return (
    <div
      className="modal fade"
      id={`confirm_${props.id}`}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Confirm</h4>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <img src="/assets/images/close.svg" alt="" />
            </button>
          </div>
          <div className="modal-body">
          <div className="confirm-content-body">
          <svg className="warning-icon" width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#dc3545" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm48-176a48 48 0 1 1-96 0 48 48 0 0 1 96 0zm-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"/></svg>
              <h2>Are you sure?</h2>
            <span>
              
               Do you want to delete{props.name ? <b> "{props.name}?"</b>:"?"}
            </span>
          </div>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
              id="delete"
              onClick={() => props.yes(props.id)}
            >
             Delete
            </button>
            <button
              type="button"
              className="btn btn-light"
              id="cancel"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
             Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
