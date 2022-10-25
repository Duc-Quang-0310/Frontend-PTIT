import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthSlice from './common/auth/auth.slice';
import CommentSlice from './common/comment/comment.slice';
import CounterSlice from './common/counter/counter.slice';
import LaptopSlice from './common/laptop/laptop.slice';

const counterPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'counter',
  storage
};

const authPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'auth',
  storage,
  whitelist: [
    'province',
    'district',
    'ward',
    'cart',
    'token',
    'user',
    'profile',
    'favoriteItem'
  ]
};

const laptopPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'laptop',
  storage,
  whitelist: ['allLaptop']
};

const commentPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'comment',
  storage
};

export default {
  counter: persistReducer(counterPersistConfig, CounterSlice),
  auth: persistReducer(authPersistConfig, AuthSlice),
  laptop: persistReducer(laptopPersistConfig, LaptopSlice),
  comment: persistReducer(commentPersistConfig, CommentSlice)
};
