import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { toast } from 'react-toastify';

import { useStore } from '../store';
import loginService from '../services/login';
import userService from '../services/user';
import { Page } from '../styles';
import { useStyles } from '../styles/theme';

const RegisterPage = () => {
  const { setUserId } = useStore(state => state);
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userId = await loginService.createUser({
        username,
        password,
      });
      userService.setToken(userId);
      setUserId(userId);
    } catch (exception) {
      toast.error('Failed to register');
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

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id={'password'}
        label={'Password'}
        name={'password'}
        value={confirmPassword}
        onChange={({ target }) => setConfirmPassword(target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSignUp}
      >
        Register
      </Button>
    </Page>
  );
};

export default RegisterPage;
