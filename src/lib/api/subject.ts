import { queryString } from '../utils/common'
import { formatSubject } from '../utils/format-api'
import apiService from './root'

export const getSubjectById = async (id: string) => {
  const response = await apiService('GET', queryString(['subjects', 'search'], { id }))

  return formatSubject(response.data[0])
}

export const deleteSubject = async (id: string) => {
  const response = await apiService('DELETE', queryString(['subjects', id]))
  return response
}

export const updateSubject = async (id: string, data: any) => {
  const response = await apiService('PUT', `subjects/${id}`, formatSubject(data, true))
  return response
}

export const createSubject = async (data: any) => {
  const response = await apiService('POST', queryString(['subjects']), formatSubject(data, true))
  return response
}

export const searchListSubject = async (params: any) => {
  const response = await apiService('GET', queryString(['subjects', 'search'], formatSubject(params, true)))
  const formatData = response.data?.map((item: any) => formatSubject(item))
  return formatData
}
