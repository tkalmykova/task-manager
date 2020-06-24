import Form from './components/Form';
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import useStyles from './useStyles';

const PasswordResetForm = () => {
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
        <Form onSubmit={handleSubmit} />
      )}
    </>
  );
};
export default PasswordResetForm;
