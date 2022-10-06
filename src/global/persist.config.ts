import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthSlice from './common/auth/auth.slice';
import CounterSlice from './common/counter/counter.slice';

const counterPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'counter',
  storage
};

const authPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'auth',
  storage
};

export default {
  counter: persistReducer(counterPersistConfig, CounterSlice),
  auth: persistReducer(authPersistConfig, AuthSlice)
};
