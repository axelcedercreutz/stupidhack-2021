import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@material-ui/core';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import useStore from '../store';
import loginService from '../services/login';
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
      if (password === confirmPassword) {
        const userId = await loginService.createUser({
          username,
          password,
        });
        setUserId(userId);
      } else {
        toast.error("Passwords don't match");
      }
    } catch (exception) {
      toast.error('Failed to register');
    }
  };

  return (
    <Page>
      <Typography variant="h4" component="h2" align="center" padding="20">
        Register
      </Typography>

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id={'username'}
        label={'Username'}
        name={'username'}
        type="password"
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
        type="password"
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

      <Box p={3}>
        <Typography variant="body2" align="center">
          <Link to="/">Log in</Link>
        </Typography>
      </Box>
    </Page>
  );
};

export default RegisterPage;