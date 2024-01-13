import React, {createContext, useEffect, useState} from 'react';
import {store} from '../store';

const MainContext = createContext();
const {Provider} = MainContext;
const MainProvider = props => {
  const [refresh, setRefresh] = useState(Date.now());
  const {application} = store.getState();
  useEffect(() => {
    console.log('hehfkdjhfkasjdhfkasdjhflkasdj');
    console.log(8, JSON.stringify(application));
  }, [refresh, application]);
  return (
    <Provider value={{refresh, setRefresh, ...application}}>
      {props.children}
    </Provider>
  );
};
export {MainContext, MainProvider};
