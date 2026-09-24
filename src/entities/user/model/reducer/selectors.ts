import type { RootState } from '@/app/providers/store'

export const selectUser = (state: RootState) => state.user.user
export const isUserAuth = (state: RootState) => state.user.isAuth
