import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterSlice from './common/counter/counter.slice';

const counterPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'counter',
  storage
};

export default {
  counter: persistReducer(counterPersistConfig, counterSlice)
};
