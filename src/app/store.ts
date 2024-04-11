import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../redux/features/pokemon/pokemonResumeSlice'
import paginationSlice from '../redux/features/pagination/paginationSlice'

export const store = configureStore({
	reducer: {
		pokemon: pokemonReducer,
		pagination: paginationSlice
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
