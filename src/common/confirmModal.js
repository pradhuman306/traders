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
              <img src="/assets/images/icon-close.svg" alt="" />
            </button>
          </div>
          <div className="modal-body">
            <span className="confirm-content alert alert-danger w-100 alert-delete">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="#721c24"
                  strokeWidth="2"
                ></circle>
                <path
                  d="M12.5 7.5C12.5 7.77614 12.2761 8 12 8C11.7239 8 11.5 7.77614 11.5 7.5C11.5 7.22386 11.7239 7 12 7C12.2761 7 12.5 7.22386 12.5 7.5Z"
                  fill="#721c24"
                  stroke="#721c24"
                ></path>
                <path d="M12 17V10" stroke="#721c24" strokeWidth="2"></path>
              </svg>
              Are you sure you want to delete <b>{props.name}?</b>
            </span>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-primary"
              id="delete"
              onClick={() => props.yes(props.id)}
            >
             Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
