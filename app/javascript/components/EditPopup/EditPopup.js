import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import { has } from 'ramda';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserSelect from 'components/UserSelect';

import Form from './components/Form';
import TaskPresenter from 'presenters/TaskPresenter';

import useStyles from './useStyles';

const EditPopup = ({ cardId, onClose, onCardDestroy, onLoadCard, onCardUpdate }) => {
  const [task, setTask] = useState(null);
  const [isSaving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const styles = useStyles();

  useEffect(() => {
    onLoadCard(cardId).then(setTask);
  }, []);

  const handleCardUpdate = () => {
    setSaving(true);

    onCardUpdate(task).catch((error) => {
      setSaving(false);
      setErrors(error || {});

      if (error instanceof Error) {
        alert(`Update Failed! Error: ${error.message}`);
      }
    });
  };

  const handleCardDestroy = () => {
    setSaving(true);

    onCardDestroy(task).catch((error) => {
      setSaving(false);

      alert(`Destruction Failed! Error: ${error.message}`);
    });
  };
  const isLoading = isNil(task);
  const handleChangeSelect = (fieldName) => (user) => setTask({ ...task, [fieldName]: user });
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
            <>
              <Form errors={errors} onChange={setTask} task={task} />
              <UserSelect
                label="Author"
                value={isLoading ? null : task.author}
                onChange={handleChangeSelect('author')}
                isDisabled={isLoading || isSaving}
                isRequired
                error={has('author', errors)}
                helperText={errors.author && errors.author.join(', ')}
                isClearable
              />
              <UserSelect
                label="Assignee"
                value={isLoading ? null : task.assignee}
                onChange={handleChangeSelect('assignee')}
                isDisabled={isLoading || isSaving}
                isRequired
                error={has('assignee', errors)}
                helperText={errors.assignee}
                isClearable
              />
            </>
          )}
        </CardContent>
        <CardActions className={styles.actions}>
          <Button
            disabled={isLoading || isSaving}
            onClick={handleCardUpdate}
            size="small"
            variant="contained"
            color="primary"
          >
            Update
          </Button>
          <Button
            disabled={isLoading || isSaving}
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
};

export default EditPopup;
