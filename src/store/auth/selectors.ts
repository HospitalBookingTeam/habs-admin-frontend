import { RootState } from '..'

export const selectAuth = (state: RootState) => state.auth
export const selectAuthToken = (state: RootState) => state.auth.token

export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated
