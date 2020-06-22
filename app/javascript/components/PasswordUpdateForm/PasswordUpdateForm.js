import React from 'react';
// import PropTypes from 'prop-types';
import useStyles from './useStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const PasswordUpdateForm = () => {
  const styles = useStyles();

  return (
    <form className={styles.card}>
      <Card className={styles.root}>
        <CardHeader className={styles.card} title="Reset Password" />
        <CardContent className={styles.content}>
          <TextField
            // error={has('email', errors)}
            // helperText={errors.email}
            // onChange={handleChangeTextField('enail')}
            // value={TaskPresenter.name(task)}
            label="New Password"
            required
            margin="dense"
            variant="filled"
          />
          <TextField
            // error={has('email', errors)}
            // helperText={errors.email}
            // onChange={handleChangeTextField('enail')}
            // value={TaskPresenter.name(task)}
            label="Confirm new password"
            required
            margin="dense"
            variant="filled"
          />
          <Button className={styles.button} variant="contained" color="primary">
            Save Password
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default PasswordUpdateForm;
