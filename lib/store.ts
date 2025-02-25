import { configureStore } from "@reduxjs/toolkit"
import extraNavReducer from './features/ExtraNav/extraNavSlice'
import imageProductReducer from './features/ImageProduct/imageProductSlice'
import attrProductReducer from './features/attrProduct/attrProductSlice'
import variantReducer from './features/variant/variantSlice'
import spinnerReducer from './features/spinner/spinnerSlice'

export const store = configureStore({
  reducer: {
    extraNav: extraNavReducer,
    imageProduct: imageProductReducer,
    attrProduct: attrProductReducer,
    variant: variantReducer,
    spinner: spinnerReducer,
  }
})

// Infer the type of makeStore
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store