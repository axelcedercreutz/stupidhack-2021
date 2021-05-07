import React, { useState, useEffect } from 'react';
import userService from './services/user';
import loginService from './services/login';
import Notification from './components/Notification';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import PhotoGallery from './components/PhotoGallery';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

const App = () => {
  const classes = useStyles();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [toggleLogin, setToggleLogin] = useState('login');
  const [userInfo, setUserInfo] = useState();

  const noccos = [
    {
      flavor: 'Carnival',
      amount: 1,
    },
    {
      flavor: 'Mongo',
      amount: 1,
    },
    {
      flavor: 'Leila',
      amount: 1,
    },
    {
      flavor: 'Pekka',
      amount: 1,
    },
    {
      flavor: 'Olli "VIDUIXMÄÄÄN" GIGGILÄ',
      amount: 1,
    },
  ];

  useEffect(() => {
    let loggedUserJSON = window.localStorage.getItem('nocccoinUser');
    if (loggedUserJSON) {
      console.log(loggedUserJSON);
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      userService.setToken(user.user_id);
    }
  }, []);

  useEffect(() => {
    console.log(user);
    const newUserInfo = userService.getBasicInfo();
    setUserInfo(newUserInfo);
  }, [user]);

  const handleSignUp = async () => {
    try {
      const user = await loginService.createUser({
        user_id: 1,
        nickname,
        password,
      });
      window.localStorage.setItem('nocccoinUser', JSON.stringify(user));
      userService.setToken(user.user_id);
      setUser(user);
      setNickname('');
      setPassword('');
    } catch (exception) {
      setNotificationMessage('Wrong username or password');
      setNotificationType('error');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await loginService.login({
        nickname,
        password,
      });
      window.localStorage.setItem('nocccoinUser', JSON.stringify(user));
      userService.setToken(user.user_id);
      setUser(user);
      setNickname('');
      setPassword('');
    } catch (exception) {
      setNotificationMessage('Wrong username or password');
      setNotificationType('error');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const renderUserInfo = () => (
    <Card className={classes.root} raised={true}>
      <CardContent>
        <Typography className={classes.title} color="primary" gutterBottom>
          {userInfo.nickname + ' logged in'}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {userInfo.user_id} Noccocoins
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            window.localStorage.clear();
            setUser(null);
          }}
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );

  const renderSignUpForm = () => (
    <>
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id={'nickname'}
          label={'Nickname'}
          name={'nickname'}
          onChange={({ target }) => setNickname(target.value)}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id={'password'}
          label={'Password'}
          name={'password'}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={toggleLogin === 'login' ? handleLogin : handleSignUp}
      >
        Add
      </Button>
    </>
  );

  const renderLoggedInPage = () => (
    <div>
      {renderUserInfo()}
      <Dashboard noccoFlavors={noccos} />
    </div>
  );
  return (
    <div>
      <h1>Nocccoin</h1>
      <Header user={user} />
      <Switch>
        <Route path="/photo-gallery">
          <PhotoGallery />
        </Route>
        <Route path="/mine">
          <PhotoGallery />
        </Route>
        <Route path="/">
          <h2>
            {user === null
              ? toggleLogin === 'login'
                ? 'Login'
                : 'Sign up'
              : 'Your Nocccoins'}
          </h2>
          {user === null && (
            <Button
              onClick={() =>
                setToggleLogin(toggleLogin === 'login' ? 'signup' : 'login')
              }
            >
              {toggleLogin === 'login' ? 'Login' : 'Sign up'}
            </Button>
          )}
          {user === null ? renderSignUpForm() : renderLoggedInPage()}
        </Route>
      </Switch>
      <Notification
        message={notificationMessage}
        notificationType={notificationType}
      />
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    width: '18%',
    margin: '2%',
    display: 'inline-block',
    ['@media screen and (max-width: 960px)']: {
      width: 200,
      margin: 20,
    },
  },
  title: {
    fontSize: 18,
  },
});

export default App;
