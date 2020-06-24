import Form from './components/Form';
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import useStyles from './useStyles';
import PasswordResetRepository from 'repositories/PasswordResetRepository';

const PasswordResetForm = () => {
  const [isResetRequested, setIsResetRequested] = useState(false);
  const styles = useStyles();
  const handleSubmit = (email) => {
    PasswordResetRepository.create(email).then(() => setIsResetRequested(true));
  };

  return (
    <>
      {isResetRequested ? (
        <Card className={styles.card}> Check your inbox for the next steps.</Card>
      ) : (
        <Form onSubmit={handleSubmit} />
      )}
    </>
  );
};
export default PasswordResetForm;
