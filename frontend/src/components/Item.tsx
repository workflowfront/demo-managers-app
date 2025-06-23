import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Manager } from "../types";

interface ItemProps {
  item: Manager;
  onItemClick: (item: Manager) => void;
  onItemLike: (item: Manager) => void;
  onItemDelete: (item: Manager) => void;
}

const Item: React.FC<ItemProps> = ({
  item,
  onItemClick,
  onItemLike,
  onItemDelete,
}) => {
  const itemStyle = { backgroundImage: `url(${item.avatarUrl})` };

  function handleClick() {
    onItemClick(item);
  }

  function handleLikeClick() {
    onItemLike(item);
  }

  function handleDeleteClick() {
    onItemDelete(item);
  }

  const currentUser = React.useContext(CurrentUserContext);
  // Здесь предполагается, что likes и owner есть в Manager, если нет — скорректируйте тип
  const isLiked =
    item.likes?.some &&
    currentUser &&
    item.likes.some((i: string) => i === currentUser.id);
  const itemLikeButtonClassName = `item__like-button ${isLiked ? "item__like-button_is-active" : ""}`;
  const isOwn = currentUser && item.owner === currentUser.id;
  const itemDeleteButtonClassName = `item__delete-button ${isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"}`;

  return (
    <li className="managers__item item">
      <div className="item__image" style={itemStyle} onClick={handleClick} />
      <button
        type="button"
        className={itemDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="item__description">
        <h2 className="item__title">{item.name}</h2>
        <div className="item__likes">
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="item__like-count">{item.likes?.length ?? 0}</p>
        </div>
      </div>
    </li>
  );
};

export default Item;
