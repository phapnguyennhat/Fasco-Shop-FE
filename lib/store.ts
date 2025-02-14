import { configureStore } from "@reduxjs/toolkit"
import extraNavReducer from './features/ExtraNav/extraNavSlice'
import imageProductReducer from './features/ImageProduct/imageProductSlice'
import positionReducer from './features/Position/positionSlice'


export const store = configureStore({
  reducer: {
    extraNav: extraNavReducer,
    imageProduct: imageProductReducer,
  }
})

// Infer the type of makeStore
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store