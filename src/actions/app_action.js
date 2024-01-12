import {createActions} from '../config/createActions';

const actions = {
  GET_CONFIG: 'GET_CONFIG',
  GET_CONFIG_SUCCESS: 'GET_CONFIG_SUCCESS',
  GET_CONFIG_FAIL: 'GET_CONFIG_FAIL',
};

const endPoints = {
  GET_CONFIG: {
    method: 'POST',
    url: '/config',
  },
};

const AppAction = {
  actions,
  endPoints,
  actionApp: createActions(actions),
};

export default AppAction;
