import React, { useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import noccocoins from '../services/noccocoins';
import { Page } from '../styles';
import useStore from '../store';
import { baseUrl } from '../utils/config';

const PhotoGallery = () => {
  const { latestChainId, setLatestChainId } = useStore(state => state);

  const updateChainLength = async () => {
    const chainLength = await noccocoins.getNocccainLength();
    setLatestChainId(chainLength);
  };

  useEffect(() => {
    updateChainLength();
  }, [latestChainId]);

  const renderImages = count => {
    return Array.from(Array(count).concat(count).keys()).map(x => (
      <img
        src={`${baseUrl}/noccchain/${count - x}`}
        key={x}
        style={{ objectFit: 'contain', maxHeight: 400, marginTop: 10 }}
      />
    ));
  };

  return (
    <Page>
      <Typography variant="h4" component="h2">
        All dem {latestChainId} Nocccoins
      </Typography>

      {renderImages(latestChainId)}
    </Page>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridGap: 32,
  },
});

export default PhotoGallery;
