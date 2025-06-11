import { queryString } from '../utils/common'
import { formatCertificate } from '../utils/format-api'
import apiService from './root'

export const getCertificateList = async (params: any) => {
  const response = await apiService('GET', queryString(['certificates', 'search'], params))
  return {
    ...response,
    data: response.data.map((item: any) => formatCertificate(item))
  }
}

export const createCertificate = async (data: any) => {
  const response = await apiService('POST', 'certificates', formatCertificate(data, true))
  return response
}

export const uploadCertificate = async (data: any) => {
  const response = await apiService('POST', 'certificates/upload-pdf', data)
  return response
}
