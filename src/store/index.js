import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootSaga from '../config/saga';
import rootReducer from '../config/reducers';
/**
 * Redux Setting
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 100000,
  whitelist: ['application', 'searchData', 'ReducerAuth'],
};
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['security', 'token'],
  whitelist: ['ReducerAuth'],
};
rootReducer.ReducerAuth = persistReducer(
  authPersistConfig,
  rootReducer.ReducerAuth,
);
// let middleware = []; //thunk
// if (process.env.NODE_ENV === `development`) {
//   middleware.push(logger);
// }
const persistedReducer = persistReducer(persistConfig, rootReducer);
const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();

  // Enable devTools and logger for dev environment
  if (process.env.NODE_ENV === 'development') {
    //if (__DEV__) {
    const store = createStore(
      persistedReducer,
      composeWithDevTools(applyMiddleware(sagaMiddleware)),
      // composeWithDevTools(applyMiddleware(sagaMiddleware, createLogger()))
    );
    sagaMiddleware.run(rootSaga);
    return store;
  }

  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(sagaMiddleware)),
    //composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

const store = configureStore(); //createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export {store, persistor, persistConfig};
