import { useSelector } from 'react-redux';
import { useTasksActions } from 'slices/TasksSlice';

const TaskBoardContainer = (props) => {
  const { children } = props;
  const board = useSelector((state) => state.TasksSlice.board);

  const { loadBoard, loadColumn } = useTasksActions();

  return children({
    board,
    loadBoard,
    loadColumn
  });
};

export default TaskBoardContainer;
