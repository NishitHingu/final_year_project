import { configureStore } from '@reduxjs/toolkit'
import stock from '../features/searchBar/Stock';

export const store = configureStore({
  reducer:{
    stock
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch