import {put, all, call, takeLatest} from 'redux-saga/effects';
import Request from '../config/request';
import {responseCode} from '../config/constants';
import AppAction from '../actions/app_action';

export function* getConfig(action) {
  try {
    const results = yield call(
      Request.callAPI,
      AppAction.endPoints.GET_CONFIG.method,
      AppAction.endPoints.GET_CONFIG.url,
      action,
    );
    switch (results.code) {
      case responseCode.SUCCESS:
        yield put({
          type: AppAction.actions.GET_CONFIG_SUCCESS,
          payload: {...results.data, accountUser: {...results.accountUser}},
        });
        if (action.payload.callback) {
          action.payload.callback(results.data);
        }
        break;
      default:
        yield put({
          type: AppAction.actions.GET_CONFIG_FAIL,
          payload: results.error,
        });
    }
  } catch (error) {
    yield put({
      type: AppAction.actions.GET_CONFIG_FAIL,
      payload: error,
    });
  }
}

export default function* watchAppAction() {
  yield all([takeLatest(AppAction.actions.GET_CONFIG, getConfig)]);
}
