import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: 465,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    outline: 0,
  },
  content: {
    display: 'flex',
    alignItems: 'stretch ',
    flexDirection: 'column',
  },
}));

export default useStyles;
