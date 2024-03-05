import { configureStore } from '@reduxjs/toolkit'
import { FactApi } from '../services/FactApi';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import Slice from './Slice'

export const store = configureStore({
  reducer: {
    slice: Slice.reducer,
    [FactApi.reducerPath]: FactApi.reducer
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(FactApi.middleware),
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
