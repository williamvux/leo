import {combineReducers} from 'redux';
import {AppReducer} from '../reducers';

const rootReducer = combineReducers({
  application: AppReducer,
});

export default rootReducer;
