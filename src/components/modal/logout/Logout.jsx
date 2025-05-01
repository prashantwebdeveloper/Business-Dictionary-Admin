import React from 'react';
import { Modal } from 'react-bootstrap';

const Logout = ({ show, handleClose, isLogoutLoading, handleLogout }) => {
    return (
        <Modal show={show} centered>
            <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                    Logout
                </h5>
            </div>
            <div className="modal-body">
                <p>
                    Are you sure you want to logout ?
                </p>
            </div>
            <div className="modal-footer">
                <button type="button" className="close-btn" onClick={handleClose}>
                    No
                </button>
                <button
                    type="button"
                    className={`delete-btn ${isLogoutLoading ? 'btn-loading' : ''}`}
                    disabled={isLogoutLoading}
                    onClick={handleLogout}
                >
                    {isLogoutLoading && <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    }
                    {/* {isLogoutLoading ? 'Logging out...' : 'Logout'} */}
                    {isLogoutLoading ? '' : 'Yes'}
                </button>
            </div>
        </Modal>
    )
}

export default Logout;