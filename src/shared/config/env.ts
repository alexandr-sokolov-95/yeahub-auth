const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL

if (!rawApiBaseUrl) {
  throw new Error(
    'Missing required env variable VITE_API_BASE_URL. ' +
      'Add it to .env.local (see .env.example) and restart the dev server.',
  )
}

export const apiBaseUrl = rawApiBaseUrl.replace(/\/+$/, '')