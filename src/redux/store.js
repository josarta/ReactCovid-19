import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from './rootReducer';
import { persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage' 
 
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['permissions'],
  whitelist: ['user']
}

let middlewares = [thunk];
 
const persistedReducer = persistReducer(persistConfig, combinedReducers)
 
const store = createStore(persistedReducer, composeWithDevTools(
  applyMiddleware(...middlewares),
  ))

export default store;
