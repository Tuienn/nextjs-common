import { queryString } from '../utils/common'
import { formatClass } from '../utils/format-api'
import apiService from './root'

export const getClassById = async (id: string) => {
  const response = await apiService('GET', `classes/${id}`)

  return formatClass(response)
}

export const deleteClass = async (id: string) => {
  const response = await apiService('DELETE', queryString(['classes', id]))
  return response
}

export const updateClass = async (id: string, data: any) => {
  const response = await apiService('PUT', `classes/${id}`, formatClass(data, true))
  return response
}

export const createClass = async (data: any) => {
  const response = await apiService('POST', `classes`, formatClass(data, true))
  return response
}

export const searchListClass = async (params: any) => {
  const response = await apiService('GET', queryString(['classes', 'search'], params))
  const formatData = response.data?.map((item: any) => formatClass(item))
  return formatData
}
