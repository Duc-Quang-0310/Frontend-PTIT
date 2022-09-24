import createSagaMiddleware from '@redux-saga/core';
import { persistStore } from 'redux-persist';
import {
  combineReducers,
  configureStore,
  Reducer,
  Store
} from '@reduxjs/toolkit';
import counterSlice from './common/counter/counter.slice';
import persistConfig from './persist.config';
import rootSaga from './root.saga';

const sagaMiddleware = createSagaMiddleware();

const combinedReducer = combineReducers({
  counter: counterSlice
});

export const store: Store = configureStore({
  reducer: combineReducers(persistConfig) as Reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware),
  devTools: true
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
