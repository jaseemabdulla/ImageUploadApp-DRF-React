// import {createStore} from 'redux'

// const initalState = {
//     value : 0
// }

// function appReducer(prevState = initalState,action){
//     return prevState
// }


// const store = createStore(appReducer)

// export default store

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {persistStore} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';

const persistConfig = {
    key: 'root',
    storage,
  };

  const reducer = combineReducers({
    userSlice,
  })
  const persistedReducer = persistReducer(persistConfig,reducer)
  const store = configureStore({
    reducer:persistedReducer
  })
  const persistor = persistStore(store)
  
  export {store,persistor}