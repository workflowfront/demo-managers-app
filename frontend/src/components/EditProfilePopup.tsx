import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

interface EditProfilePopupProps {
  isOpen: boolean;
  onUpdateUser: (data: { name: string; about: string }) => void;
  onClose: () => void;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({
  isOpen,
  onUpdateUser,
  onClose,
}) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser && currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Изменить данные"
      name="edit"
    >
      <label className="popup__label">
        <input
          type="text"
          name="userName"
          id="owner-name"
          className="popup__input popup__input_type_name"
          placeholder="Имя"
          required
          minLength={2}
          maxLength={40}
          pattern="[a-zA-Zа-яА-Я -]{1,}"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          name="userDescription"
          id="owner-description"
          className="popup__input popup__input_type_description"
          placeholder="Род деятельности"
          required
          minLength={2}
          maxLength={200}
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
