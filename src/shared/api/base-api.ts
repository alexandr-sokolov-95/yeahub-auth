import { createApi, fetchBaseQuery, type BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { apiBaseUrl } from '../config'
import { getAccessToken, removeAccessToken, setAccessToken } from '../lib/localstorage'

const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = getAccessToken()

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

type RefreshResponse = { access_token: string }

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery({ url: '/auth/refresh' }, api, extraOptions)

    if (refreshResult.data) {
      const { access_token } = refreshResult.data as RefreshResponse
      setAccessToken(access_token)
      result = await baseQuery(args, api, extraOptions)
    } else {
      removeAccessToken()
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: () => ({}),
})
