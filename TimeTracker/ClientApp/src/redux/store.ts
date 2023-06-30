import { configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { user } from './slices';
import { rootEpic } from "./epics"

const middleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
      user,
    },
    middleware: [
      middleware
    ]
  })

middleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export const useCurrentSelector: TypedUseSelectorHook<RootState> = useSelector;
