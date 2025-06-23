import React from "react";
import Item from "./Item";
import { Manager } from "../types";

interface ProfileProps {
  currentUser: {
    avatar: string;
    name: string;
    about: string;
  };
  editAvatarIcon: string;
  handleEditAvatarClick: () => void;
  handleEditProfileClick: () => void;
  handleAddManagerClick: () => void;
  cards: Manager[];
  onCardClick: (card: Manager) => void;
  onCardLike: (card: Manager) => void;
  onCardDelete: (card: Manager) => void;
}

const Profile: React.FC<ProfileProps> = ({
  currentUser,
  editAvatarIcon,
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddManagerClick,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) => {
  return (
    <main className="content page__content">
      <section className="profile page__section">
        <div className="profile__user">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фото профиля"
            />
            <button
              className="profile__avatar-edit"
              onClick={handleEditAvatarClick}
            >
              <img src={editAvatarIcon} alt="Редактировать аватар" />
            </button>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
            <button
              className="profile__edit-button"
              onClick={handleEditProfileClick}
            >
              Редактировать
            </button>
          </div>
        </div>
        <button className="profile__add-button" onClick={handleAddManagerClick}>
          +
        </button>
      </section>
      <section className="managers page__section">
        <ul className="managers__list">
          {cards.map((card) => (
            <Item
              key={card.id}
              item={card}
              onItemClick={onCardClick}
              onItemLike={onCardLike}
              onItemDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Profile;
