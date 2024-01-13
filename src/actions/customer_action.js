import {createActions} from '../config/createActions';

const actions = {
  GET_PROFILE_CUSTOMER: 'PROFILE_CUSTOMER',
  GET_PROFILE_CUSTOMER_SUCCESS: 'PROFILE_CUSTOMER_SUCCESS',
  GET_PROFILE_CUSTOMER_FAIL: 'PROFILE_CUSTOMER_FAIL',
};

const endPoints = {
  PROFILE_CUSTOMER: {
    method: 'POST',
    url: '/create-customer',
  },
};

const CustomerAction = {
  actions,
  endPoints,
  actionCustomer: createActions(actions),
};

export default CustomerAction;
