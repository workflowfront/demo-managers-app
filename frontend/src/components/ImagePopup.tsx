import React from "react";
import { Manager } from "../types";

interface ImagePopupProps {
  item: Manager | null;
  onClose: () => void;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <div className="popup popup_type_image popup_is-opened">
      <div className="popup__content popup__content_type_image">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <img src={item.avatarUrl} alt={item.name} className="popup__image" />
        <p className="popup__caption">{item.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
