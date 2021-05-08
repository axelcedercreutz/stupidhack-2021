import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Page } from '../styles';

const Mine = () => {
  return (
    <Page>
      <Typography variant="h4" component="h2" align="center" padding="20">
        Latest block
      </Typography>

      <Link to="/mine/photo">Submit new block</Link>

      <Image src="/nocccoins/mine" />
    </Page>
  );
};

const Image = styled.img`
  width: 100%;
  padding-top: 3rem;
  object-fit: contain;
`;

export default Mine;
