import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '../types'

interface IUserState {
  user: IUser | null
  isAuth: boolean
}

const initialState: IUserState = {
  user: null,
  isAuth: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
      state.isAuth = true
    },
    clearUser(state) {
      state.user = null
      state.isAuth = false
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
