import {put, all, call, takeLatest} from 'redux-saga/effects';
import Request from '../config/request';
import {responseCode} from '../config/constants';
import OrderAction from '../actions/order_action';

export function* createOrder(action) {
  try {
    const results = yield call(
      Request.callAPI,
      OrderAction.endPoints.CREATE_ORDER.method,
      OrderAction.endPoints.CREATE_ORDER.url,
      action,
    );
    switch (results.code) {
      case responseCode.SUCCESS:
        if (action.payload.callback) {
          action.payload.callback(results.data);
        }
        break;
      default:
        yield put({
          type: OrderAction.actions.CREATE_ORDER_FAIL,
          payload: results.error,
        });
    }
  } catch (error) {
    yield put({
      type: OrderAction.actions.CREATE_ORDER_FAIL,
      payload: error,
    });
  }
}

export default function* watchOrderAction() {
  yield all([takeLatest(OrderAction.actions.CREATE_ORDER, createOrder)]);
}
