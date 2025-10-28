import { combineReducers, configureStore } from '@reduxjs/toolkit';
import historySlice from './historySlice';
import commandSlice from './commandSlice';

const rootReducer = combineReducers({
    historyConfig: historySlice,
    commandConfig: commandSlice,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
