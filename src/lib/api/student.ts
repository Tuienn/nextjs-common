'use server'

import { queryString } from '../utils/common'
import { formatStudent } from '../utils/format-api'
import apiService from './root'

export const searchStudentByKeyword = async (keyword: string) => {
  const response = await apiService('GET', queryString(['student', 'search'], { keyword }))

  return response
}

export const getStudentById = async (id: string) => {
  const response = await apiService('GET', queryString(['users', 'search'], { id }))

  return formatStudent(response.data[0])
}

export const deleteStudent = async (id: string) => {
  const response = await apiService('DELETE', queryString(['users', id]))
  return response
}

export const updateStudent = async (id: string, data: any) => {
  const response = await apiService('PUT', `users/${id}`, formatStudent(data, true))
  return response
}

export const createStudent = async (data: any) => {
  const response = await apiService('POST', queryString(['users']), formatStudent(data, true))
  return response
}

export const searchListStudent = async (params: any) => {
  const response = await apiService('GET', queryString(['users', 'search'], formatStudent(params, true)))
  const formatData = response.data?.map((item: any) => formatStudent(item))
  return formatData
}
