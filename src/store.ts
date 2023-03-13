import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import cancelApi from "./TestCancel/cancelApi"

export const createStore = (options?: ConfigureStoreOptions["preloadedState"] | undefined) =>
    configureStore({
        reducer: {
            [cancelApi.reducerPath]: cancelApi.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cancelApi.middleware),
        ...options,
    })

export const store = createStore()
setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
