import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export interface IApiErrorBody {
  message: string
  description: string
  statusCode: number
}

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError =>
  typeof error === 'object' && error !== null && 'status' in error

export const isApiErrorBody = (data: unknown): data is IApiErrorBody =>
  typeof data === 'object' && data !== null && 'description' in data
