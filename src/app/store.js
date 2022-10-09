import { configureStore } from '@reduxjs/toolkit';

import walletReducer from '../reducers/walletSlice';
import { colorApi } from '../services/colorApi';

// kita membuat store atau brankas dari bank
// di sini kita bisa menyimpan state dalam satu objek atau single object
// untuk membuat store, perlu memberikan reducer dan initial state

// untuk redux toolkit, kita membuat store dengan fungsi configureStore
// configureStore menerima object yang berisi reducer dan preloadedState
// bentuknya {reducer: rootReducer, preloadedState: initialState}

const store = configureStore({
  reducer: {
    wallet: walletReducer,
    [colorApi.reducerPath]: colorApi.reducer
  },
  // Menambahkan middleware untuk caching, invalidation, pooling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(colorApi.middleware),
});

export default store;
