import React from "react";

interface LoginProps {
  onLogin: (data: { email: string; password: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onLogin(userData);
  }
  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Авторизация</h3>
          <label className="auth-form__input">
            <input
              type="text"
              name="name"
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
              placeholder="Ключ"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="auth-form__button" type="submit">
          Вперёд
        </button>
      </form>
    </div>
  );
};

export default Login;
