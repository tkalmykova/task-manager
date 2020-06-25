import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: 465,
  },
  alert: {
    display: 'flex',
    justifyContent: 'center',
    outline: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    outline: 0,
  },
}));

export default useStyles;
