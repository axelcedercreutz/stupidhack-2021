import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route } from 'react-router-dom';

import PhotoGallery from './components/PhotoGallery';
import Header from './components/Header';
import NewPhoto from './components/NewPhoto';
import Mine from './components/Mine';
import FriendPage from './pages/FriendPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useInit } from './components/useInit';
import useStore from './store';

const App = () => {
  useInit();

  const { isLoggedIn } = useStore(state => state);

  return (
    <div>
      <h1>Nocccoin</h1>
      <Header />
      <Switch>
        <Route path="/"></Route>

        <Route path="/photo-gallery">
          <PhotoGallery />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>

        {isLoggedIn ? (
          <>
            <Route path="/friends/:id">
              <FriendPage />
            </Route>

            <Route path="/mine/photo">
              <NewPhoto />
            </Route>

            <Route path="/mine">
              <Mine />
            </Route>

            <Route path="/profile">
              <UserPage />
            </Route>
          </>
        ) : (
          <>
            <Route path="/register">
              <RegisterPage />
            </Route>
          </>
        )}
      </Switch>

      <ToastContainer />
    </div>
  );
};

export default App;
