import AppAction from '../actions/app_action';

const initialState = {};

const AppReducer = (state = initialState, actions = {}) => {
  switch (actions.type) {
    case AppAction.actions.GET_CONFIG_SUCCESS: {
      return {...state, ...actions.payload};
    }
    default: {
      return state;
    }
  }
};

export default AppReducer;
