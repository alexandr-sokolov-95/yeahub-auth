import type { IUserAuthResponse } from '@/entities/user/model/types'
import { baseApi } from '@/shared/api'
import { removeAccessToken, setAccessToken } from '@/shared/lib/localstorage'
import type { ILoginData, IRegisterData } from '../model'
import { clearUser, setUser } from '@/entities/user/model/reducer'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IUserAuthResponse, ILoginData>({
      query: (auth) => ({
        url: 'auth/login',
        method: 'POST',
        body: auth,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          const { access_token } = result.data
          setAccessToken(access_token)
          dispatch(setUser(result.data.user))
        } catch (error) {
          console.error(error)
        }
      },
    }),
    register: build.mutation<IUserAuthResponse, IRegisterData>({
      query: (register) => ({
        url: 'auth/signUp',
        method: 'POST',
        body: register,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          const { access_token } = result.data
          setAccessToken(access_token)
          dispatch(setUser(result.data.user))
        } catch (error) {
          console.error(error)
        }
      },
    }),
    logout: build.query<void, void>({
      query: () => 'auth/logout',
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled
          removeAccessToken()
          dispatch(clearUser())
        } catch (error) {
          console.error(error)
        }
      },
    }),
    sendResetEmail: build.mutation<void, Pick<IRegisterData, 'email'>>({
      query: (email) => ({
        url: '/auth/send-reset-password',
        method: 'GET',
        body: email,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery } = authApi
