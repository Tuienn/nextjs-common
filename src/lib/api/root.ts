const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

const defaultHeaders = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
  Accept: 'application/json'
}

const apiService = async (
  method: 'POST' | 'PUT' | 'GET' | 'DELETE' | 'PATCH',
  url: string,
  data?: Record<string, string | number | null | undefined>,
  isAuth?: boolean,
  headers?: HeadersInit
) => {
  const fullUrl = `${BASE_URL}/${url}`

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: isAuth
        ? { ...defaultHeaders, Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` }
        : defaultHeaders,
      body: data ? JSON.stringify(data) : null,
      ...headers
    })

    return await response.json()
  } catch (error) {
    throw error
  }
}

export default apiService
