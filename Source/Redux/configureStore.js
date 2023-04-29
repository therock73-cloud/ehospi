import {persistStore, persistReducer} from 'redux-persist';
import {legacy_createStore as createStore} from 'redux';

import storage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
