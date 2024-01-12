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
      action.payload,
    );
    switch (results.code) {
      case responseCode.SUCCESS:
        if (action.payload.callback) {
          action.payload.callback(results.data);
        }
        yield put({
          type: AppAction.actions.GET_CONFIG_SUCCESS,
          payload: {...results.data, accountUser: {...results.accountUser}},
        });
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
