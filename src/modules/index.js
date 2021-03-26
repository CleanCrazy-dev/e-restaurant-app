import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import CafeReducer from './reducers/cafe';

const peresistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
  whitelist: ['cafe'],
  blacklist: [],
};

const rootReducer = combineReducers({
  cafe: CafeReducer
});

const persistedReducer = persistReducer(peresistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(store);

export { store, persistor };
