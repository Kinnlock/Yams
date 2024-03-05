import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'

import { gameApi } from './game'

export const store = configureStore({
    reducer: {
        [gameApi.reducerPath]: gameApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gameApi.middleware)
})

setupListeners(store.dispatch)