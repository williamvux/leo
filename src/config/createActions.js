import {createAction} from 'redux-actions';

import camelCase from 'lodash/camelCase';

export const createActions = actions => {
  const exportFunc = {};
  for (let index in actions) {
    if (actions.hasOwnProperty(index) && typeof actions[index] === 'string') {
      const nAction = {};
      nAction[camelCase(index)] = actions[index];
      exportFunc[camelCase(index)] = createAction(actions[index]);
    }
  }
  return exportFunc;
};
