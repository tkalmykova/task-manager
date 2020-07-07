import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { has } from 'ramda';

import TextField from '@material-ui/core/TextField';
import useStyles from './useStyles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const Form = ({ onSubmit }) => {
  const [passwordUpdateForm, setPasswordUpdateForm] = useState({});
  const [errors, setErrors] = useState({});

  const handleChangeTextField = (fieldName) => ({ target: { value } }) =>
    setPasswordUpdateForm({ ...passwordUpdateForm, [fieldName]: value });

  const handleSubmit = () => {
    onSubmit(passwordUpdateForm).catch((obtainedErrors) => setErrors(obtainedErrors));
  };

  const styles = useStyles();

  return (
    <form className={styles.root}>
      <Card className={styles.card}>
        <CardHeader title="Update Password" />
        <CardContent className={styles.content}>
          <TextField
            error={has('password', errors)}
            helperText={errors.password}
            onChange={handleChangeTextField('password')}
            value={passwordUpdateForm.password}
            label="New Password"
            required
            margin="dense"
          />
          <TextField
            error={has('passwordConfirmation', errors)}
            helperText={errors.passwordConfirmation}
            onChange={handleChangeTextField('passwordConfirmation')}
            value={passwordUpdateForm.passwordConfirmation}
            label="Confirm new password"
            required
            margin="dense"
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Password
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
