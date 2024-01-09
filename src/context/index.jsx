import React, {createContext} from 'react';

const MainContext = createContext();
const {Provider} = MainContext;
const MainProvider = props => {
  return <Provider value={{}}>{props.children}</Provider>;
};
export {MainContext, MainProvider};
