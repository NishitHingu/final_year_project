import { configureStore } from '@reduxjs/toolkit'
import autocompleteSearchBar from '../features/searchBar/autocompleteSearchBar';

export const store = configureStore({
  reducer:{
    autocompleteSearchBar
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch