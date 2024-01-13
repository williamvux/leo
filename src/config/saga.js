import {all} from 'redux-saga/effects';
import watchAppAction from '../saga/app_saga';
import watchCustomerAction from '../saga/customer_saga';
import watchOrderAction from '../saga/order_saga';

export default function* rootSagas() {
  yield all([watchAppAction(), watchCustomerAction(), watchOrderAction()]);
}
