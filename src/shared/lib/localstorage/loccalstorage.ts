const ACCESS_TOKEN = 'accessToken'

const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token)
}

const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN)
}

const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN)
}

export { setAccessToken, getAccessToken, removeAccessToken }
