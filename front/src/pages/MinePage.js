import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { baseUrl } from '../utils/config';

import NewPhoto from '../components/NewPhoto';
import { Page } from '../styles';
import useStore from '../store';

const MinePage = () => {
  const { latestChainId } = useStore(state => state);
  useEffect(() => {}, [latestChainId]);

  return (
    <Page>
      <Typography variant="h4" component="h2" align="center" padding="20">
        Latest Noccc
      </Typography>

      <Image
        key={latestChainId}
        src={`${baseUrl}/nocccoins/mine?v=${latestChainId}`}
      />

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
