import PasswordResetForm from './components/PasswordResetForm';
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import useStyles from './useStyles';

const PasswordReset = () => {
  const [isResetRequested, setIsResetRequested] = useState(false);
  const styles = useStyles();
  const handleSubmit = () => {
    setIsResetRequested(true);
  };

  return (
    <>
      {isResetRequested ? (
        <Card className={styles.card}> Check your inbox for the next steps.</Card>
      ) : (
        <PasswordResetForm onSubmit={handleSubmit} />
      )}
    </>
  );
};
export default PasswordReset;
