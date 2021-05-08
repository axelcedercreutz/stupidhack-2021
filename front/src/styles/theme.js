import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '32px 0',
    display: 'inline-block',
    '@media screen and (max-width: 960px)': {
      width: 200,
      margin: 20,
    },
  },
  title: {
    fontSize: 18,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
});
