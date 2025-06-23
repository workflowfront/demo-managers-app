import React from "react";
import SuccessIcon from "../images/success-icon.svg";
import ErrorIcon from "../images/error-icon.svg";

interface InfoTooltipProps {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "fail" | string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  isOpen,
  onClose,
  status,
}) => {
  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <img
          src={status === "success" ? SuccessIcon : ErrorIcon}
          alt={status === "success" ? "Успех" : "Ошибка"}
          className="popup__icon"
        />
        <p className="popup__message">
          {status === "success"
            ? "Регистрация прошла успешно!"
            : "Что-то пошло не так!"}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;
