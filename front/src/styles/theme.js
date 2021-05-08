import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    width: '18%',
    margin: '2%',
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
