import { queryString } from '../utils/common'
import { formatStudent } from '../utils/format-api'
import apiService from './root'

export const searchStudent = async (params: any) => {
  const res = await apiService('GET', queryString(['users', 'search'], params))

  return {
    ...res,
    data: res.data.map((item: any) => formatStudent(item))
  } as any
}

export const getStudentById = async (id: string) => {
  const res = await apiService('GET', queryString(['users', id]))
  return formatStudent(res.data)
}

export const createStudent = async (data: any) => {
  const res = await apiService('POST', 'users', formatStudent(data, true))
  return res
}

export const updateStudent = async (id: string, data: any) => {
  const res = await apiService('PUT', queryString(['users', id]), formatStudent(data, true))
  return res
}

export const deleteStudent = async (id: string) => {
  const res = await apiService('DELETE', queryString(['users', id]))
  return res
}

export const importExcel = async (data: any) => {
  const res = await apiService('POST', 'users/import-excel', data)
  return res
}
