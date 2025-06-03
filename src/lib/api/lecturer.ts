import { queryString } from '../utils/common'
import { formatClass } from '../utils/format-api'
import apiService from './root'

export const getLecturerById = async (id: string) => {
  const response = await apiService('GET', `lecturers/${id}`)

  return response
}

export const deleteLecturer = async (id: string) => {
  const response = await apiService('DELETE', queryString(['lecturers', id]))
  return response
}

export const updateLecturer = async (id: string, data: any) => {
  const response = await apiService('PUT', `lecturers/${id}`, data)
  return response
}

export const createLecturer = async (data: any) => {
  const response = await apiService('POST', `lecturers`, data)
  return response
}

export const searchListLecturer = async (params: any) => {
  const response = await apiService('GET', queryString(['lecturers', 'search'], params))

  return response
}
