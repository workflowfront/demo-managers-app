import React from "react";
import PopupWithForm from "./PopupWithForm";

interface AddManagerPopupProps {
  isOpen: boolean;
  onAddManager: (data: { name: string; link: string }) => void;
  onClose: () => void;
}

const AddManagerPopup: React.FC<AddManagerPopupProps> = ({
  isOpen,
  onAddManager,
  onClose,
}) => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLink(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddManager({ name, link });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Новое управление"
      name="new-manager"
    >
      <label className="popup__label">
        <input
          type="text"
          name="name"
          id="manager-name"
          className="popup__input popup__input_type_item-name"
          placeholder="Имя"
          required
          minLength={1}
          maxLength={30}
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="manager-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="url"
          name="link"
          id="manager-link"
          className="popup__input popup__input_type_url"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__error" id="manager-link-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddManagerPopup;
