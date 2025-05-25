import { queryString } from '../utils/common'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

const defaultHeaders = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
  Accept: 'application/json',
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
}

const apiService = async (
  method: 'POST' | 'PUT' | 'GET' | 'DELETE' | 'PATCH',
  slashParams: (string | number)[],
  params?: Record<string, string | number | null | undefined>,
  data?: Record<string, string | number | null | undefined>,
  headers?: HeadersInit
) => {
  const fullUrl = `${BASE_URL}/${queryString(slashParams, params)}`

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: defaultHeaders,
      body: data ? JSON.stringify(data) : null,
      ...headers
    })

    return await response.json()
  } catch (error) {
    throw error
  }
}

export default apiService
