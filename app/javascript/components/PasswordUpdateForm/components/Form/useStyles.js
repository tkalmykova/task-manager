import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: 465,
  },
  card: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    alignItems: 'stretch ',
    flexDirection: 'column',
  },
}));

export default useStyles;
