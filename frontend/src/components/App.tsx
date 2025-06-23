import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddManagerPopup from "./AddManagerPopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { User, Manager } from "../types";

const App: React.FC = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddManagerPopupOpen, setIsAddManagerPopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<Manager | null>(null);
  const [items, setItems] = React.useState<Manager[]>([]);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      api
        .checkToken(token)
        .then((res: any) => {
          api.setToken(token);
          setEmail(res.email);
          setIsLoggedIn(true);
          return api.getAppInfo();
        })
        .then(([itemData, userData]: [Manager[], User]) => {
          setCurrentUser(userData);
          setItems(itemData);
          history.push("/");
        })
        .catch((err: any) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);

  function handleEditProfileClick(): void {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddManagerClick(): void {
    setIsAddManagerPopupOpen(true);
  }

  function handleEditAvatarClick(): void {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups(): void {
    setIsEditProfilePopupOpen(false);
    setIsAddManagerPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedItem(null);
  }

  function handleItemClick(item: Manager): void {
    setSelectedItem(item);
  }

  function handleUpdateUser(userUpdate: { name: string; about: string }): void {
    api
      .setUserInfo(userUpdate)
      .then((newUserData: User) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err: any) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate: { avatar: string }): void {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData: User) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err: any) => console.log(err));
  }

  function handleItemLike(item: Manager): void {
    if (!currentUser) return;
    const isLiked = item.likes?.some((i: string) => i === currentUser.id);
    api
      .changeLikeItemStatus(item.id, !isLiked)
      .then((newItem: Manager) => {
        setItems((items) => items.map((c) => (c.id === item.id ? newItem : c)));
      })
      .catch((err: any) => console.log(err));
  }

  function handleItemDelete(item: Manager): void {
    api
      .removeItem(item.id)
      .then(() => {
        setItems((items) => items.filter((c) => c.id !== item.id));
      })
      .catch((err: any) => console.log(err));
  }

  function handleAddManagerSubmit(newItem: {
    name: string;
    link: string;
  }): void {
    api
      .addItem(newItem)
      .then((newItemFull: Manager) => {
        setItems([newItemFull, ...items]);
        closeAllPopups();
      })
      .catch((err: any) => console.log(err));
    setIsAddManagerPopupOpen(false);
  }

  function onRegister({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): void {
    api
      .register(email, password)
      .then(() => {
        setTooltipStatus("success");
        setIsInfoToolTipOpen(true);
        history.push("/signin");
      })
      .catch(() => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function onLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): void {
    api
      .login(email, password)
      .then(() => {
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch(() => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function onSignOut(): void {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            items={items}
            onEditProfile={handleEditProfileClick}
            onAddManager={handleAddManagerClick}
            onEditAvatar={handleEditAvatarClick}
            onItemClick={handleItemClick}
            onItemLike={handleItemLike}
            onItemDelete={handleItemDelete}
            loggedIn={isLoggedIn}
          />
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        <AddManagerPopup
          isOpen={isAddManagerPopupOpen}
          onAddManager={handleAddManagerSubmit}
          onClose={closeAllPopups}
        />
        {/* Для PopupWithForm ниже нужны обязательные пропсы, иначе TS ругается */}
        {/* <PopupWithForm title="Вы уверены?" name="remove-item" buttonText="Да" isOpen={false} onSubmit={() => {}} onClose={() => {}} >{null}</PopupWithForm> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        <ImagePopup item={selectedItem} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={tooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
