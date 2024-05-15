import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import shortUrlSlice from '../shortUrl/shortUrl.slice';

export const store = configureStore({
  reducer: {
    shortUrl: shortUrlSlice,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// export type AppDispatch = typeof store.dispatch;

// export type RootState = ReturnType<typeof store.getState>;

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;


