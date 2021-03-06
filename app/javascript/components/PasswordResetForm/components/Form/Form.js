import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const Form = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleChangeEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = () => {
    onSubmit(email);
  };

  const styles = useStyles();

  return (
    <form className={styles.root}>
      <Card className={styles.card}>
        <CardHeader title="Reset Password" />
        <CardContent className={styles.content}>
          <TextField onChange={handleChangeEmail} value={email} label="Email" required margin="dense" />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Reset Password
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
