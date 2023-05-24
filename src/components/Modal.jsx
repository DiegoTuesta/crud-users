// import { Children } from "react"

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div className="modal" style={{ display: isOpen ? 'grid': 'none'  }}>
        <div className="modal-container">
            <button className="btn btn-modal-close" onClick={onClose}>X</button>
            <div className="modal-content">
               {children}
            </div>
        </div>
    </div>
  )
}

export default Modal