import React, {createContext, useState} from 'react';
import {store} from '../store';

const MainContext = createContext();
const {Provider} = MainContext;
const MainProvider = props => {
  const {application} = store.getState();
  const [accountUser, setAccountUser] = useState(application.accountUser ?? {});
  return (
    <Provider value={{...application, accountUser, setAccountUser}}>
      {props.children}
    </Provider>
  );
};
export {MainContext, MainProvider};
