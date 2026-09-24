interface IUser {
  id: string
  username: string
  email: string
  phone: string
  country: string
  city: string
  birthday: string
  address: string
  avatarUrl: string
  updatedAt: string
  createdAt: string
  userRoles: IUserRole[]
  isVerified: boolean
  isEmailNotificationsEnable: boolean
}

interface IUserRole {
  id: number
  name: string
  permissions: IUserPermission[]
}

interface IUserPermission {
  id: number
  name: string
}

interface IUserAuthResponse {
  access_token: string
  user: IUser
}

type TAuthStatusCode = 200 | 201 | 401 | 403 | 409

interface IUserAuthError {
  message: string
  statusCode: TAuthStatusCode
  description: string
}

export type { IUser, IUserAuthResponse, IUserAuthError }
