import { baseApi } from '@/shared/api'
import { clearUser, setUser } from '../model/reducer'
import type { IUser } from '../model/types'

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<IUser, void>({
      query: () => '/auth/profile',
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(setUser(result.data))
        } catch (error) {
          console.error(error)
          dispatch(clearUser())
        }
      },
    }),
  }),
})
export const { useGetMeQuery } = userApi
