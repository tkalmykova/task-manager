import Form from './components/Form';
import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';

import PasswordResetRepository from 'repositories/PasswordResetRepository';
import useStyles from './useStyles';

const PasswordResetForm = () => {
  const [isResetRequested, setIsResetRequested] = useState(false);
  const styles = useStyles();
  const handleSubmit = (email) => {
    PasswordResetRepository.create(email).then(() => setIsResetRequested(true));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.root}>
          {isResetRequested ? (
            <Alert severity="success" className={styles.alert}>
              {' '}
              Check your inbox for the next steps.
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </>
  );
};
export default PasswordResetForm;
