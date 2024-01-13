import React, {createContext, useEffect, useState} from 'react';
import {store} from '../store';

const MainContext = createContext();
const {Provider} = MainContext;
const MainProvider = props => {
  const [accountId, setAccountId] = useState('');
  const {application} = store.getState();
  useEffect(() => {
    console.log('hehfkdjhfkasjdhfkasdjhflkasdj');
    console.log(8, JSON.stringify(application));
  }, [accountId, application]);
  return (
    <Provider value={{accountId, setAccountId, ...application}}>
      {props.children}
    </Provider>
  );
};
export {MainContext, MainProvider};
