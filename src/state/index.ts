import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  middleware: [epicMiddleware],
  reducer: combineReducers({}),
});

const epics = combineEpics();
epicMiddleware.run(epics);

export default store;
