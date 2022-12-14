import createSagaMiddleware from '@redux-saga/core';
import { persistStore } from 'redux-persist';
import {
  combineReducers,
  configureStore,
  Reducer,
  Store
} from '@reduxjs/toolkit';
import CounterSlice from './common/counter/counter.slice';
import persistConfig from './persist.config';
import rootSaga from './root.saga';
import AuthSlice from './common/auth/auth.slice';
import LaptopSlice from './common/laptop/laptop.slice';
import CommentSlice from './common/comment/comment.slice';

const sagaMiddleware = createSagaMiddleware();

const combinedReducer = combineReducers({
  counter: CounterSlice,
  auth: AuthSlice,
  laptop: LaptopSlice,
  comment: CommentSlice
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
