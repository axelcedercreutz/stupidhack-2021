import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@material-ui/core';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import useStore from '../store';
import { Page } from '../styles';
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
      window.localStorage.setItem(
        'nocccoinUser',
        JSON.stringify({ ...user, password }),
      );
      setUserId(user._id);
    } catch (exception) {
      toast.error('Failed to log in');
    }
  };

  return (
    <Page>
      <Typography variant="h4" component="h2" align="center" padding="20">
        Log in
      </Typography>

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
        type="password"
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

      <Box p={3}>
        <Typography variant="body2" align="center">
          <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Page>
  );
};

export default LoginPage;
