import React, {createContext} from 'react';
import {store} from '../store';

const MainContext = createContext();
const {Provider} = MainContext;
const MainProvider = props => {
  const {application} = store.getState();
  return <Provider value={{...application}}>{props.children}</Provider>;
};
export {MainContext, MainProvider};
