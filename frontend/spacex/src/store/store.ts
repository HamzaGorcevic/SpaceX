import {  configureStore } from '@reduxjs/toolkit'
import launchesSlice from './launchesSlice'
const store = configureStore({
    reducer:{launches:launchesSlice}
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store