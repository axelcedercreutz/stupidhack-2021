import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import userService from './services/user';
import loginService from './services/login';
import noccocoinsService from './services/noccocoins';
import PhotoGallery from './components/PhotoGallery';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import NewPhoto from './components/NewPhoto';
import Mine from './components/Mine';
import Friend from './components/Friend';
import { useInit } from './components/useInit';

const App = () => {
  useInit();

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
        <Route path="/"></Route>
      </Switch>

      <ToastContainer />
    </div>
  );
};

export default App;
