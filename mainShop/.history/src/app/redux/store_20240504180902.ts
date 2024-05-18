import { configureStore } from '@reduxjs/toolkit'
import CartRedux from './features/cart/cart.redux'
import  UserRedux  from './features/user/uset.redux'

export const makeStore = () => {
  return configureStore({
    reducer: {
      CartRedux,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']