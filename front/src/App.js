import React, { useState, useEffect } from "react";
import userService from "./services/user";
import loginService from "./services/login";
import Notification from './components/Notification';

const App = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    let loggedUserJSON = window.localStorage.getItem("nocccoinUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      userService.setToken(user.token);
    }
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.createUser({
        user_id: 2,
        nickname,
        password,
      });
      window.localStorage.setItem("nocccoinUser", JSON.stringify(user));
      userService.setToken(user.user_id);
      setUser(user);
      setNickname("");
      setPassword("");
    } catch (exception) {
      setNotificationMessage("Wrong username or password");
      setNotificationType("error");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const renderUserInfo = () => (
    <div>
      <h3>{user.nickname + " logged in"}</h3>
      <button
        onClick={() => {
          window.localStorage.clear();
          setUser(null);
        }}
      >
        Logout
      </button>
    </div>
  );

  const renderSignUpForm = () => (
    <form onSubmit={handleSignUp}>
      <div>
        nickname
        <input
          id="nickname"
          type="text"
          value={nickname}
          name="Nickname"
          onChange={({ target }) => setNickname(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );

  const renderLoggedInPage = () => (
    <div>
      {renderUserInfo()}
    </div>
  );
  return (
    <div>
      <h1>Nocccoin</h1>
      <h2>{user === null ? "Sign up" : "Your Nocccoins"}</h2>
      <Notification
        message={notificationMessage}
        notificationType={notificationType}
      />
      {user === null ? renderSignUpForm() : renderLoggedInPage()}
    </div>
  );
};

export default App;
