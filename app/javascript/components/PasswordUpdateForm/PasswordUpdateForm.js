import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import useStyles from './useStyles';
import PasswordUpdateRepository from 'repositories/PasswordUpdateRepository';
import Form from './components/Form';
import Alert from '@material-ui/lab/Alert';

const PasswordUpdateForm = () => {
  const styles = useStyles();
  const [isUpdateDone, setIsUpdateDone] = useState(false);

  const handleSubmit = (params) => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    return PasswordUpdateRepository.update(token, params).then(() => {
      setIsUpdateDone(true);
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.root}>
        {isUpdateDone ? (
          <Alert severity="success" className={styles.alert}>
            {' '}
            Your password updated successfully.
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default PasswordUpdateForm;
