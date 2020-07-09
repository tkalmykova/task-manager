import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import Form from './components/Form';
import TaskPresenter from 'presenters/TaskPresenter';

import useStyles from './useStyles';

const EditPopup = ({
  cardId,
  onClose,
  onCardDestroy,
  onLoadCard,
  onCardUpdate,
  onCardImageAttach,
  onCardImageRemoval,
}) => {
  const [task, setTask] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const styles = useStyles();

  useEffect(() => {
    onLoadCard(cardId).then(setTask);
  }, []);

  const handleCardUpdate = () => {
    setSubmitting(true);

    onCardUpdate(task).catch((error) => {
      setSubmitting(false);
      setErrors(error || {});

      if (error instanceof Error) {
        alert(`Update Failed! Error: ${error.message}`);
      }
    });
  };

  const handleCardDestroy = () => {
    setSubmitting(true);

    onCardDestroy(task).catch((error) => {
      setSubmitting(false);

      alert(`Destruction Failed! Error: ${error.message}`);
    });
  };

  const handleCardImageAttach = ({ attachment }) => {
    setSubmitting(true);

    onCardImageAttach(task, attachment).catch((error) => {
      setSubmitting(false);

      alert(`Image Attach Failed! Error: ${error.message}`);
    });
  };
  const handleCardImageRemoval = () => {
    setSubmitting(true);

    onCardImageRemoval(task).catch((error) => {
      setSubmitting(false);

      alert(`Image removal Failed! Error: ${error.message}`);
    });
  };

  const isLoading = isNil(task);

  return (
    <Modal className={styles.modal} open onClose={onClose}>
      <Card className={styles.root}>
        <CardHeader
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
          title={
            isLoading
              ? 'Your task is loading. Please be patient.'
              : `Task # ${TaskPresenter.id(task)} [${TaskPresenter.name(task)}]`
          }
        />
        <CardContent>
          {isLoading ? (
            <div className={styles.loader}>
              <CircularProgress />
            </div>
          ) : (
            <Form
              errors={errors}
              onChange={setTask}
              onImageAttach={handleCardImageAttach}
              onImageRemoval={handleCardImageRemoval}
              task={task}
            />
          )}
        </CardContent>
        <CardActions className={styles.actions}>
          <Button
            disabled={isLoading || isSubmitting}
            onClick={handleCardUpdate}
            size="small"
            variant="contained"
            color="primary"
          >
            Update
          </Button>
          <Button
            disabled={isLoading || isSubmitting}
            onClick={handleCardDestroy}
            size="small"
            variant="contained"
            color="secondary"
          >
            Destroy
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

EditPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  cardId: PropTypes.number.isRequired,
  onCardDestroy: PropTypes.func.isRequired,
  onLoadCard: PropTypes.func.isRequired,
  onCardUpdate: PropTypes.func.isRequired,
  onCardImageAttach: PropTypes.func.isRequired,
  onCardImageRemoval: PropTypes.func.isRequired,
};

export default EditPopup;
