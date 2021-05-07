import React, { useState, useEffect } from 'react';
import userService from './services/user';
import loginService from './services/login';
import noccocoinsService from './services/noccocoins';
import Notification from './components/Notification';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import PhotoGallery from './components/PhotoGallery';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import NewPhoto from './components/NewPhoto';
import Mine from './components/Mine';
import Friend from './components/Friend';

const App = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(undefined);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [toggleLogin, setToggleLogin] = useState('login');
  const [userInfo, setUserInfo] = useState();
  const [friends, setFriends] = useState([]);

  const match = useRouteMatch('/friends/:id');

  const friend = match
    ? friends.find(friend => friend._id === match.params.id)
    : undefined;

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
      const user = JSON.parse(loggedUserJSON);
      setPassword(user.password);
      setUserId(user.userId);
      userService.setToken(user.userId);
    }
  }, []);

  useEffect(async () => {
    if (userId) {
      const newUserInfo = await userService.getBasicInfo();
      setUserInfo(newUserInfo);
      window.localStorage.setItem('nocccoinUser', JSON.stringify(newUserInfo));
      const allUsers = await userService.getAllUsers();
      setFriends(allUsers);
    }
  }, [userId]);

  const handleSignUp = async () => {
    try {
      const userId = await loginService.createUser({
        username,
        password,
      });
      userService.setToken(userId);
      setUserId(userId);
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
        username,
        password,
      });

      window.localStorage.setItem('nocccoinUser', JSON.stringify(user));
      userService.setToken(user._id);
      setUserId(user._id);
    } catch (exception) {
      setNotificationMessage('Wrong username or password');
      setNotificationType('error');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUsername('');
    setPassword('');
    setUserId(undefined);
    setUserInfo(undefined);
  };

  const handleTransfer = async () => {
    const response = await noccocoinsService.transferCoins(
      password,
      userId,
      '6095b3f1e0eccae5569a3c94',
      2,
    );
    console.log(response);
    const newUserInfo = {
      ...userInfo,
      nocccoins: response.nocccoins,
    };
    setUserInfo(newUserInfo);
  };

  const renderUserInfo = () => (
    <Card className={classes.root} raised={true}>
      <CardContent>
        <Typography className={classes.title} color="primary" gutterBottom>
          {'Hello ' + userInfo.username + '!'}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          You have {userInfo.nocccoins} Noccocoins
        </Typography>
      </CardContent>
    </Card>
  );

  const renderActionBox = () => (
    <Card raised={true}>
      <CardContent>
        <Typography>Your friends!</Typography>
        {friends.map(friend => {
          return <Link to={`/friends/${friend._id}`}>{friend.username}</Link>;
        })}
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
          id={'username'}
          label={'Username'}
          name={'username'}
          onChange={({ target }) => setUsername(target.value)}
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
      <div className={classes.flex}>
        {renderUserInfo()}
        {renderActionBox()}
      </div>
      <Dashboard noccoFlavors={noccos} />
    </div>
  );

  return (
    <div>
      <h1>Nocccoin</h1>
      <Header
        userInfo={userInfo}
        userId={userId}
        handleLogout={() => handleLogout()}
      />
      <Switch>
        <Route path="/friends/:id">
          {
            <Friend
              friend={friend}
              userId={userId}
              handleTransfer={() => handleTransfer()}
            />
          }
        </Route>
        <Route path="/photo-gallery">
          <PhotoGallery />
        </Route>
        <Route path="/mine/photo">
          <NewPhoto />
        </Route>
        <Route path="/mine">
          <Mine />
        </Route>
        <Route path="/">
          <h2>
            {!userInfo
              ? toggleLogin === 'login'
                ? 'Login'
                : 'Sign up'
              : 'Your Nocccoins'}
          </h2>
          {!userInfo && (
            <Button
              onClick={() =>
                setToggleLogin(toggleLogin === 'login' ? 'signup' : 'login')
              }
            >
              {toggleLogin === 'login' ? 'Sign up' : 'Login'}
            </Button>
          )}
          {userInfo ? renderLoggedInPage() : renderSignUpForm()}
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
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default App;
