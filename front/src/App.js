import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route } from 'react-router-dom';

import PhotoGallery from './components/PhotoGallery';
import Header from './components/Header';
import MinePage from './pages/MinePage';
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
      <Header />

      <Switch>
        <Route path="/photo-gallery">
          <PhotoGallery />
        </Route>

        {isLoggedIn() ? (
          <Switch>
            <Route path="/friends/:id">
              <FriendPage />
            </Route>

            <Route path="/">
              <UserPage />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/register">
              <RegisterPage />
            </Route>

            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        )}
      </Switch>

      <ToastContainer />
    </div>
  );
};

export default App;
