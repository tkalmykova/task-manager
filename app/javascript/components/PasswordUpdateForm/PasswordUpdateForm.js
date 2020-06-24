import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import useStyles from './useStyles';
import PasswordUpdateRepository from 'repositories/PasswordUpdateRepository';
import Form from './components/Form';
import Card from '@material-ui/core/Card';

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
    <>
      {isUpdateDone ? (
        <Card className={styles.card}> Your password updated successfully.</Card>
      ) : (
        <Form onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default PasswordUpdateForm;
