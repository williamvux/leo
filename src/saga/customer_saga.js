import {put, all, call, takeLatest} from 'redux-saga/effects';
import Request from '../config/request';
import {responseCode} from '../config/constants';
import CustomerAction from '../actions/customer_action';

export function* getProfileCustomer(action) {
  try {
    const results = yield call(
      Request.callAPI,
      CustomerAction.endPoints.PROFILE_CUSTOMER.method,
      CustomerAction.endPoints.PROFILE_CUSTOMER.url,
      action,
    );
    if (action.payload.callback) {
      action.payload.callback(results);
    }
    switch (results.code) {
      case responseCode.SUCCESS:
        break;
      default:
        yield put({
          type: CustomerAction.actions.GET_PROFILE_CUSTOMER_FAIL,
          payload: results.error,
        });
    }
  } catch (error) {
    yield put({
      type: CustomerAction.actions.GET_PROFILE_CUSTOMER_FAIL,
      payload: error,
    });
  }
}

export default function* watchCustomerAction() {
  yield all([
    takeLatest(CustomerAction.actions.GET_PROFILE_CUSTOMER, getProfileCustomer),
  ]);
}
