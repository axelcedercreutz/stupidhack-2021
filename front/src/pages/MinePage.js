import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import NewPhoto from '../components/NewPhoto';
import { Page } from '../styles';

const MinePage = () => {
  return (
    <Page>
      <Typography variant="h4" component="h2" align="center" padding="20">
        Latest block
      </Typography>

      <Image src="http://noccco.in/api/nocccoins/mine" />

      <Spacer />

      <NewPhoto />
    </Page>
  );
};

const Image = styled.img`
  width: 100%;
  padding-top: 3rem;
  object-fit: contain;
`;

const Spacer = styled.div`
  height: 3rem;
  width: 100%;
`;

export default MinePage;
