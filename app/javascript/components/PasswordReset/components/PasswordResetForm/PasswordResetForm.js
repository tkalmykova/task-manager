import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const PasswordResetForm = ({ onSubmit }) => {
  const styles = useStyles();

  return (
    <form className={styles.card}>
      <Card className={styles.root}>
        <CardHeader className={styles.card} title="Reset Password" />
        <CardContent>
          <TextField
            id="outlined-basic"
            // error={has('email', errors)}
            // helperText={errors.email}
            // onChange={handleChangeTextField('enail')}
            // value={TaskPresenter.name(task)}
            label="Email"
            required
            margin="dense"
          />
          <Button className={styles.button} variant="contained" color="primary" onClick={onSubmit}>
            Reset Password
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

PasswordResetForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PasswordResetForm;
