import { configureStore } from '@reduxjs/toolkit'
import CartRedux from './features/cart/cart.redux'
import UserRedux  from './features/user/user.redux'
import SearchRedux from './features/search/search.redux'
import ProductRedux from './features/product/product.redux'
import OrderRedux from './features/order/order.redux'
import RoomchatRedux  from './features/roomchat/roomchat.redux'

export const makeStore = () => {
  return configureStore({
    reducer: {
      CartRedux,
      UserRedux,
      SearchRedux,
      ProductRedux,
      OrderRedux,
      RoomchatRedux
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']