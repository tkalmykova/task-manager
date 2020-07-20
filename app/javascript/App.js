import React from 'react';

import store from 'store';
import { Provider } from 'react-redux';

import TaskBoardContainer from 'containers/TaskBoardContainer';
import TaskBoard from 'components/TaskBoard';

const App = () => {
  return (
    <Provider store={store}>
      <TaskBoardContainer>
        {({ board, loadBoard, loadColumn }) => <TaskBoard loadBoard={loadBoard} board={board} loadColumn={loadColumn} />}
      </TaskBoardContainer>
    </Provider>
  );
};

export default App;
