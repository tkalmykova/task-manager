import React from 'react';
import PropTypes from 'prop-types';
import { has, isNil } from 'ramda';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import useStyles from './useStyles';
import TaskPresenter from 'presenters/TaskPresenter';
import UserSelect from 'components/UserSelect';
import ImageUpload from 'components/ImageUpload';

const Form = ({ errors, onChange, onImageAttach, onImageRemoval, task }) => {
  const handleChangeTextField = (fieldName) => (event) => onChange({ ...task, [fieldName]: event.target.value });
  const styles = useStyles();
  const handleChangeSelect = (fieldName) => (user) => onChange({ ...task, [fieldName]: user });
  const imageUrl = TaskPresenter.imageUrl(task);

  return (
    <form className={styles.root}>
      <TextField
        error={has('name', errors)}
        helperText={errors.name}
        onChange={handleChangeTextField('name')}
        value={TaskPresenter.name(task)}
        label="Name"
        required
        margin="dense"
      />
      <TextField
        error={has('description', errors)}
        helperText={errors.description}
        onChange={handleChangeTextField('description')}
        value={TaskPresenter.description(task)}
        label="Description"
        required
        multiline
        margin="dense"
      />
      <UserSelect
        label="Assignee"
        value={TaskPresenter.assignee(task)}
        onChange={handleChangeSelect('assignee')}
        isRequired
        error={has('assignee', errors)}
        helperText={errors.assignee && errors.assignee.join(', ')}
        isClearable
      />
      {isNil(imageUrl) ? (
        <div className={styles.imageUploadContainer}>
          <ImageUpload onUpload={onImageAttach} />
        </div>
      ) : (
        <div className={styles.previewContainer}>
          <img className={styles.preview} src={imageUrl} alt="Attachment" />
          <Button variant="contained" size="small" color="primary" onClick={onImageRemoval}>
            Remove image
          </Button>
        </div>
      )}
    </form>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onImageAttach: PropTypes.func.isRequired,
  onImageRemoval: PropTypes.func.isRequired,
  task: TaskPresenter.shape().isRequired,
  errors: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.arrayOf(PropTypes.string),
    assignee: PropTypes.arrayOf(PropTypes.string),
  }),
};

Form.defaultProps = {
  errors: {},
};

export default Form;
