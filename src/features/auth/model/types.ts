interface ILoginData {
  username: string
  password: string
}

interface IRegisterData extends ILoginData {
  email: string
}

export type { ILoginData, IRegisterData }
