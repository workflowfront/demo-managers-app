import React from "react";
import { Route, Link } from "react-router-dom";
import logoPath from "../images/logo.svg";

interface HeaderProps {
  onSignOut: () => void;
  email: string;
}

const Header: React.FC<HeaderProps> = ({ onSignOut, email }) => {
  function handleSignOut() {
    onSignOut();
  }
  return (
    <header className="header page__section">
      <Route exact path="/">
        <div className="header__wrapper">
          <p className="header__user">{email}</p>
          <button className="header__logout" onClick={handleSignOut}>
            Выйти
          </button>
        </div>
      </Route>
      <Route path="/signup">
        <Link className="header__auth-link" to="signin">
          Вперёд
        </Link>
      </Route>
      <Route path="/signin">
        <Link className="header__auth-link" to="signup">
          Создать учётку
        </Link>
      </Route>
      <img
        src={logoPath}
        alt="Логотип проекта Management"
        className="logo header__logo"
      />
    </header>
  );
};

export default Header;
