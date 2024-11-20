import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from '../features/authSlice';
import portfolioReducer from '../features/portfolioSlice';
import tokenBalanceReducer from '@/src/features/tokenBalanceSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'portfolio'], // Only persist these reducers
};

const rootReducer = combineReducers({
  auth: authReducer,
  portfolio: portfolioReducer,
  tokenBalance: tokenBalanceReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);