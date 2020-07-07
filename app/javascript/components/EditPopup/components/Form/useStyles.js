import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  preview: {
    display: 'flex',
    flexDirection: 'column',
    width: 150,
    height: 150,
    marginBottom: 10,
  },
}));

export default useStyles;
