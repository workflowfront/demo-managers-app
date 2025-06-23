import React from "react";
import PopupWithForm from "./PopupWithForm";

interface DeleteConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
  handleConfirmDelete: () => void;
}

const DeleteConfirmPopup: React.FC<DeleteConfirmPopupProps> = ({
  isOpen,
  onClose,
  handleConfirmDelete,
}) => {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleConfirmDelete}
      onClose={onClose}
      title="Вы уверены?"
      name="remove-item"
      buttonText="Да"
    >
      {/* Можно добавить описание или предупреждение */}
    </PopupWithForm>
  );
};

export default DeleteConfirmPopup;
