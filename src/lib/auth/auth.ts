'use server'

import { redirect } from 'next/navigation'
import { createSession, deleteSession } from './session'
import apiService from '../api/root'

export async function signOut() {
  await deleteSession()
  redirect('/')
}

export async function signIn(payload: { email: string; password: string }) {
  try {
    const response = await apiService('POST', 'auth/login', payload, false)
    const data = await response.json()

    if (data.status !== 200) {
      return false
    }

    await createSession({
      access_token: data.data.access_token,
      id: data.data.id,
      role: data.data.role
    })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
