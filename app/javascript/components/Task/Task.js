import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import TaskPresenter from '../../presenters/TaskPresenter';

const Task = ({ task, onClick }) => {
  const handleClick = () => onClick(task);
  const styles = useStyles;

  return (
    <Card className={styles.root} onClick={handleClick}>
      <CardHeader title={TaskPresenter.name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {TaskPresenter.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

Task.propTypes = {
  task: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Task;
