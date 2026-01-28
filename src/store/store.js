import { configureStore } from '@reduxjs/toolkit'
import userSlide from './user-slide'
import { searchReducer } from './search'
import { cartReducer } from './cartReducer'
import { drawerReducer } from './drawerReducer'

export const store = configureStore({
  reducer: {
    user:userSlide,
    search:searchReducer,
    cart:cartReducer,
    drawer:drawerReducer,

  },
})