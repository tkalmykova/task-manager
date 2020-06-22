import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 0,
    flexDirection: 'column',
  },

  root: {
    width: 465,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
