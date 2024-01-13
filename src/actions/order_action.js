import {createActions} from '../config/createActions';

const actions = {
  CREATE_ORDER: 'CREATE_ORDER',
  CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAIL: 'CREATE_ORDER_FAIL',
};

const endPoints = {
  CREATE_ORDER: {
    method: 'POST',
    url: '/create-order',
  },
};

const OrderAction = {
  actions,
  endPoints,
  actionOrder: createActions(actions),
};

export default OrderAction;
