import React from "react";
import PopupWithForm from "./PopupWithForm";

interface EditAvatarPopupProps {
  isOpen: boolean;
  onUpdateAvatar: (data: { avatar: string }) => void;
  onClose: () => void;
}

const EditAvatarPopup: React.FC<EditAvatarPopupProps> = ({
  isOpen,
  onUpdateAvatar,
  onClose,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inputRef.current) {
      onUpdateAvatar({ avatar: inputRef.current.value });
    }
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Сменить фото"
      name="edit-avatar"
    >
      <label className="popup__label">
        <input
          type="url"
          name="avatar"
          id="owner-avatar"
          className="popup__input popup__input_type_description"
          placeholder="URL картинки"
          required
          ref={inputRef}
        />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
