import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core';

const NewPhoto = () => {
  const [takeNewPicture, setTakeNewPicture] = useState(false);
  return takeNewPicture ? (
    <>
      <Typography>This will be the image stuff</Typography>
    </>
  ) : (
    <>
      <Typography>Tähän tulee selitykset</Typography>
      <Button onClick={() => setTakeNewPicture(true)}>Ota uusi kuva</Button>
    </>
  );
};

export default NewPhoto;
