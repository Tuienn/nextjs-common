import apiService from './root'

export const sendOTP = async (email: string) => {
  const response = await apiService('POST', '/auth/request-otp', { student_email: email }, false)
  return response
}

export const verifyOTP = async (email: string, otp: string) => {
  const response = await apiService('POST', '/auth/verify-otp', { student_email: email, otp }, false)
  return response
}

export const registerAccount = async (email: string, password: string, userId: string) => {
  const response = await apiService(
    'POST',
    '/auth/register',
    {
      personal_email: email,
      password,
      user_id: userId
    },
    false
  )
  return response
}
