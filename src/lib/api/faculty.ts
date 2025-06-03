import { formatFaculty } from '../utils/format-api'
import apiService from './root'

export const getAllFaculties = async () => {
  const response = await apiService('GET', 'faculties')

  return response.map((item: any) => formatFaculty(item))
}

export const deleteFaculty = async (id: string) => {
  const response = await apiService('DELETE', `faculties/${id}`)
  return response
}

export const createFaculty = async (data: any) => {
  const response = await apiService('POST', 'faculties', formatFaculty(data, true))
  return response
}

export const getFacultyById = async (id: string) => {
  const response = await apiService('GET', `faculties/${id}`)

  return formatFaculty(response)
}

export const updateFaculty = async (id: string, data: any) => {
  const response = await apiService('PUT', `faculties/${id}`, formatFaculty(data, true))
  return response
}
