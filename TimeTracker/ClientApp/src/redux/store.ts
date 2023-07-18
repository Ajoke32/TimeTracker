import { configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable';
import { user, auth, users } from './slices';
import { rootEpic } from "./epics"
import { approvers } from "./slices";
import {vacation} from "./slices";

const middleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    auth: auth,
    user: user,
    users: users,
    approvers: approvers,
    vacations:vacation
  },
  middleware: [
    middleware
  ]
})

middleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
