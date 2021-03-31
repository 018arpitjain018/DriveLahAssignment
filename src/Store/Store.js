import { createStore, combineReducers } from 'redux';

import boxReducer from './Box/Reducer/reducer';

import { persistReducer, persistStore } from 'redux-persist'

// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['navigation']
  };

const rootReducer = combineReducers({
    box: boxReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    let persistor = persistStore(store)
    return {store, persistor}
}

