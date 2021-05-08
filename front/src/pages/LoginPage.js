import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { toast } from 'react-toastify';

import useStore from '../store';
import { Page } from '../styles';
import userService from '../services/user';
import loginService from '../services/login';
import { useStyles } from '../styles/theme';

const LoginPage = () => {
  const { setUserId } = useStore(state => state);
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      toast.error('Failed to log in');
    }
  };

  return (
    <Page>
      <h2>Register</h2>

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id={'username'}
        label={'Username'}
        name={'username'}
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id={'password'}
        label={'Password'}
        name={'password'}
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleLogin}
      >
        Log in
      </Button>
    </Page>
  );
};

export default LoginPage;
