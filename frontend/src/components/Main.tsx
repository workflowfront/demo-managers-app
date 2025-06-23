import React, { useContext } from "react";
import Item from "./Item";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { User } from "../types";

interface MainProps {
  items: any[];
  onEditProfile: () => void;
  onAddManager: () => void;
  onEditAvatar: () => void;
  onItemClick: (item: any) => void;
  onItemLike: (item: any) => void;
  onItemDelete: (item: any) => void;
}

const Main: React.FC<MainProps> = ({
  items,
  onEditProfile,
  onAddManager,
  onEditAvatar,
  onItemClick,
  onItemLike,
  onItemDelete,
}) => {
  const currentUser = useContext(CurrentUserContext) as User | null;
  const imageStyle = {
    backgroundImage: `url(${currentUser?.avatarUrl || ""})`,
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div
          className="profile__image"
          onClick={onEditAvatar}
          style={imageStyle}
        ></div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{currentUser?.position}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddManager}
        ></button>
      </section>
      <section className="managers page__section">
        <ul className="managers__list">
          {items.map((item) => (
            <Item
              key={item._id}
              item={item}
              onItemClick={onItemClick}
              onItemLike={onItemLike}
              onItemDelete={onItemDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
