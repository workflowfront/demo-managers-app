import React from "react";
import { Link } from "react-router-dom";

interface RegisterProps {
  onRegister: (data: { email: string; password: string }) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onRegister(userData);
  }
  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Регистрация нового пользователя</h3>
          <label className="auth-form__input">
            <input
              type="text"
              name="email"
              id="email"
              className="auth-form__textfield"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="auth-form__input">
            <input
              type="password"
              name="password"
              id="password"
              className="auth-form__textfield"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="auth-form__wrapper">
          <button className="auth-form__button" type="submit">
            Создать аккаунт
          </button>
          <p className="auth-form__text">
            Есть аккаунт?{" "}
            <Link className="auth-form__link" to="/signin">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
