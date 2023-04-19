import React, { useState } from "react";

import "./style.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  action: string;
  defaultValue?: string;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, action, defaultValue, title }) => {
  const [inputPostValue, setInputPostValue] = useState('');

  const handleSubmit = () => {
    onSubmit(inputPostValue);
    onClose();
  };

  const handleInputPostValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPostValue(event.target.value);
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <label htmlFor="name">
          {action === "Create" ? "Create" : "Update"} {title}:
        </label>
        
        <input onChange={handleInputPostValue} type="text" name="name" defaultValue={defaultValue} required />

        <div className="modal-buttons">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button onClick={handleSubmit} type="submit">{action === "Create" ? "Create" : "Update"}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
