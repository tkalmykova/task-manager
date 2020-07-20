import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import KanbanBoard from '@lourenci/react-kanban';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Task from 'components/Task';
import AddPopup from 'components/AddPopup';
import EditPopup from 'components/EditPopup';
import ColumnHeader from 'components/ColumnHeader';
import TaskRepository from 'repositories/TasksRepository';
import useStyles from './useStyles';

const MODES = {
  ADD: 'add',
  NONE: 'none',
};

const TaskBoard = (props) => {
  const { board, loadBoard, loadColumn } = props;
  const [mode, setMode] = useState(MODES.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);
  const styles = useStyles();

  useEffect(() => {
    loadBoard();
  }, []);

  const handleOpenAddPopup = () => {
    setMode(MODES.ADD);
  };

  const handleOpenEditPopup = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODES.EDIT);
  };

  const handleClose = () => {
    setMode(MODES.NONE);
    setOpenedTaskId(null);
  };

  const loadColumnMore = (state, page) => {
    loadColumn(state, page);
  };

  const handleCardDragEnd = () => {
    return moveTask(task, { task: { stateEvent: transition.event } })
      .then(() => {})
      .catch((error) => {
        alert(`Move failed! ${error.message}`);
      });
  };

  const handleTaskCreate = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);

    return createTask(attributes).then(() => {
      handleClose();
    });
  };

  const handleTaskLoad = (id) => {
    return TaskRepository.show(id).then(({ data: { task } }) => task);
  };

  const handleTaskUpdate = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);
  };
  const handleTaskDestroy = (task) => {
    return destroyTask(task).then(() => {
      handleClose();
    });
  };

  return (
    <>
      <Fab onClick={handleOpenAddPopup} className={styles.addButton} color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <KanbanBoard
        disableColumnDrag
        onCardDragEnd={handleCardDragEnd}
        renderCard={(card) => <Task onClick={handleOpenEditPopup} task={card} />}
        renderColumnHeader={(column) => <ColumnHeader column={column} onLoadMore={loadColumnMore} />}
      >
        {board}
      </KanbanBoard>

      {mode === MODES.ADD && <AddPopup onCreateCard={handleTaskCreate} onClose={handleClose} />}
      {mode === MODES.EDIT && (
        <EditPopup
          onLoadCard={handleTaskLoad}
          onCardDestroy={handleTaskDestroy}
          onCardUpdate={handleTaskUpdate}
          onClose={handleClose}
          cardId={openedTaskId}
        />
      )}
    </>
  );
};

TaskBoard.propTypes = {
  loadBoard: PropTypes.func.isRequired,
  loadColumn: PropTypes.func.isRequired,
  board: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        cards: PropTypes.array.isRequired,
        meta: PropTypes.shape({}).isRequired,
      }),
    ),
  }).isRequired,
};

export default TaskBoard;

// import React, { useEffect, useState } from 'react';
// import KanbanBoard from '@lourenci/react-kanban';
// import { propOr } from 'ramda';
// import Icon from '@material-ui/core/Icon';
// import useStyles from './useStyles';
// import Fab from '@material-ui/core/Fab';
// import AddPopup from 'components/AddPopup';
// import TaskForm from 'forms/TaskForm';
// import EditPopup from 'components/EditPopup';

// import Task from 'components/Task';
// import TasksRepository from 'repositories/TasksRepository';
// import ColumnHeader from 'components/ColumnHeader';

// const STATES = [
//   { key: 'new_task', value: 'New' },
//   { key: 'in_development', value: 'In Dev' },
//   { key: 'in_qa', value: 'In QA' },
//   { key: 'in_code_review', value: 'in CR' },
//   { key: 'ready_for_release', value: 'Ready for release' },
//   { key: 'released', value: 'Released' },
//   { key: 'archived', value: 'Archived' },
// ];

// const initialBoard = {
//   columns: STATES.map((column) => ({
//     id: column.key,
//     title: column.value,
//     cards: [],
//     meta: {},
//   })),
// };

// const TaskBoard = () => {
//   const [board, setBoard] = useState(initialBoard);
//   const [boardCards, setBoardCards] = useState([]);

//   const loadColumn = (state, page, perPage) => {
//     return TasksRepository.index({
//       q: { stateEq: state, s: 'created_at desc' },
//       page,
//       perPage,
//     });
//   };

//   const loadColumnInitial = (state, page = 1, perPage = 10) => {
//     loadColumn(state, page, perPage).then(({ data }) => {
//       setBoardCards((prevState) => {
//         return {
//           ...prevState,
//           [state]: { cards: data.items, meta: data.meta },
//         };
//       });
//     });
//   };

//   const loadColumnMore = (state, page = 1, perPage = 10) => {
//     loadColumn(state, page, perPage).then(({ data }) => {
//       setBoardCards((prevState) => {
//         return {
//           ...prevState,
//           [state]: { cards: prevState[state].cards.concat(data.items), meta: data.meta },
//         };
//       });
//     });
//   };

//   const generateBoard = () => {
//     const generatedBoard = {
//       columns: STATES.map(({ key, value }) => {
//         return {
//           id: key,
//           title: value,
//           cards: propOr({}, 'cards', boardCards[key]),
//           meta: propOr({}, 'meta', boardCards[key]),
//         };
//       }),
//     };

//     setBoard(generatedBoard);
//   };

//   const loadBoard = () => {
//     STATES.map(({ key }) => loadColumnInitial(key));
//   };

//   const handleCardDragEnd = (task, source, destination) => {
//     const transition = task.transitions.find(({ to }) => destination.toColumnId === to);
//     if (!transition) {
//       return null;
//     }

//     return TasksRepository.update(task.id, { stateEvent: transition.event })
//       .then(() => {
//         loadColumnInitial(destination.toColumnId);
//         loadColumnInitial(source.fromColumnId);
//       })
//       .catch((error) => {
//         alert(`Move failed! ${error.message}`);
//       });
//   };
//   const styles = useStyles;

//   const MODES = {
//     ADD: 'add',
//     NONE: 'none',
//     EDIT: 'edit',
//   };

//   const [mode, setMode] = useState(MODES.NONE);
//   const [openedTaskId, setOpenedTaskId] = useState(null);

//   const loadTask = (id) => {
//     return TasksRepository.show(id).then(({ data: { task } }) => task);
//   };

//   const handleClose = () => {
//     setMode(MODES.NONE);
//     setOpenedTaskId(null);
//   };

//   const handleTaskUpdate = (task) => {
//     const attributes = TaskForm.attributesToSubmit(task);

//     return TasksRepository.update(task.id, attributes).then(() => {
//       loadColumnInitial(task.state);
//       handleClose();
//     });
//   };

//   const handleTaskDestroy = (task) => {
//     return TasksRepository.destroy(task.id).then(() => {
//       loadColumnInitial(task.state);
//       handleClose();
//     });
//   };

//   const handleOpenEditPopup = (task) => {
//     setOpenedTaskId(task.id);
//     setMode(MODES.EDIT);
//   };

//   const handleOpenAddPopup = () => {
//     setMode(MODES.ADD);
//   };

//   const handleTaskCreate = (params) => {
//     const attributes = TaskForm.attributesToSubmit(params);
//     return TasksRepository.create(attributes).then(({ data: { task } }) => {
//       loadColumnInitial(task.state);
//       handleClose();
//     });
//   };

//   const handleImageAttach = (task, attachment) => {
//     return TasksRepository.attachImage(task.id, attachment).then(() => {
//       loadColumnInitial(task.state);
//       handleClose();
//     });
//   };

//   const handleImageRemoval = (task) => {
//     return TasksRepository.removeImage(task.id).then(() => {
//       loadColumnInitial(task.state);
//       handleClose();
//     });
//   };

//   useEffect(() => loadBoard(), []);
//   useEffect(() => generateBoard(), [boardCards]);

//   return (
//     <>
//       <Fab className={styles.addButton} color="primary" aria-label="add" onClick={handleOpenAddPopup}>
//         <Icon>add_circle</Icon>
//       </Fab>
//       {mode === MODES.ADD && <AddPopup onCreateCard={handleTaskCreate} onClose={handleClose} />}
//       {mode === MODES.EDIT && (
//         <EditPopup
//           onLoadCard={loadTask}
//           onCardDestroy={handleTaskDestroy}
//           onCardUpdate={handleTaskUpdate}
//           onCardImageAttach={handleImageAttach}
//           onCardImageRemoval={handleImageRemoval}
//           onClose={handleClose}
//           cardId={openedTaskId}
//         />
//       )}
//       <KanbanBoard
//         renderColumnHeader={(column) => <ColumnHeader column={column} onLoadMore={loadColumnMore} />}
//         renderCard={(card) => <Task onClick={handleOpenEditPopup} task={card} />}
//         onCardDragEnd={handleCardDragEnd}
//       >
//         {board}
//       </KanbanBoard>
//     </>
//   );
// };

// export default TaskBoard;
