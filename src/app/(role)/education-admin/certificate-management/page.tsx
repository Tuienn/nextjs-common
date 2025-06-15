'use client'
import PageHeader from '@/components/common/page-header'
import CommonPagination from '@/components/common/pagination'
import { UseData } from '@/components/providers/data-provider'
import CertificateActionButton from '@/components/role/education-admin/certificate-action-button'
import DetailDialog from '@/components/role/education-admin/detail-dialog'
import Filter from '@/components/role/education-admin/filter'
import TableList from '@/components/role/education-admin/table-list'
import UploadButton from '@/components/role/education-admin/upload-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CERTIFICATE_TYPE_OPTIONS, PAGE_SIZE } from '@/constants/common'

import {
  createCertificate,
  getCertificateDataById,
  getCertificateList,
  importCertificateExcel,
  uploadCertificate
} from '@/lib/api/certificate'
import { searchStudentByCode } from '@/lib/api/student'
import { showNotification } from '@/lib/utils/common'
import { formatCertificate, formatFacultyOptions } from '@/lib/utils/format-api'
import { validateNoEmpty } from '@/lib/utils/validators'
import { EyeIcon, FileUpIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { useCallback } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const CertificateManagementPage = () => {
  const [idDetail, setIdDetail] = useState<string | null | undefined>(undefined)

  const [filter, setFilter] = useState<any>({})
  const handleCloseDialog = useCallback(() => {
    setIdDetail(undefined)
  }, [])

  const queryCertificates = useSWR('certificates-list' + JSON.stringify(filter), () =>
    getCertificateList({
      ...formatCertificate(filter, true),
      page: filter.page || 1,
      page_size: PAGE_SIZE,
      faculty_code: filter.faculty || undefined,
      signed: filter.signed || undefined,
      course: filter.course || undefined
    })
  )

  const mutateCreateCertificate = useSWRMutation('create-certificate', (_, { arg }: any) => createCertificate(arg), {
    onSuccess: () => {
      showNotification('success', 'Cấp chứng chỉ thành công')
      queryCertificates.mutate()
      handleCloseDialog()
    },
    onError: (error) => {
      showNotification('error', error.message || 'Cấp chứng chỉ thất bại')
    }
  })

  const mutateUploadCertificateFile = useSWRMutation(
    'upload-certificate',
    (_, { arg }: { arg: FormData }) => uploadCertificate(arg),
    {
      onSuccess: () => {
        showNotification('success', 'Tải tệp lên thành công')
        queryCertificates.mutate()
      },
      onError: (error) => {
        showNotification('error', error.message || 'Lỗi khi tải tệp lên')
      }
    }
  )

  const mutateImportCertificateExcel = useSWRMutation(
    'import-certificate-excel',
    (_, { arg }: { arg: FormData }) => importCertificateExcel(arg),
    {
      onSuccess: (data) => {
        console.log('🚀 ~ onSuccess: ~ data:', data)

        showNotification('success', 'Nhập tệp excel thành công')
        queryCertificates.mutate()
      },
      onError: (error) => {
        showNotification('error', error.message || 'Lỗi khi nhập tệp excel')
      }
    }
  )

  const handleUpload = useCallback(
    (file: FormData) => {
      mutateUploadCertificateFile.trigger(file)
    },
    [mutateUploadCertificateFile]
  )

  const handleImportCertificateExcel = useCallback(
    (file: FormData) => {
      mutateImportCertificateExcel.trigger(file)
    },
    [mutateImportCertificateExcel]
  )

  const handleCreateCertificate = useCallback((data: any) => {
    mutateCreateCertificate.trigger(data)
  }, [])

  return (
    <>
      <PageHeader
        title='Văn bằng & Chứng chỉ'
        extra={[
          <UploadButton
            handleUpload={handleImportCertificateExcel}
            loading={mutateImportCertificateExcel.isMutating}
            title={'Tải tệp (Excel)'}
            icon={<FileUpIcon />}
          />,
          <Button onClick={() => setIdDetail(null)}>
            <PlusIcon />
            <span className='hidden sm:block'>Tạo mới</span>
          </Button>,
          <UploadButton
            handleUpload={handleUpload}
            loading={mutateUploadCertificateFile.isMutating}
            title={'Tải tệp (PDF)'}
            icon={<FileUpIcon />}
          />
        ]}
      />
      <Filter
        children={[
          {
            type: 'query_select',
            placeholder: 'Nhập và chọn mã sinh viên',
            name: 'studentCode',
            setting: {
              querySelect: {
                queryFn: (keyword: string) => searchStudentByCode(keyword)
              }
            }
          },
          {
            type: 'select',
            name: 'faculty',
            placeholder: 'Chọn chuyên ngành',
            setting: {
              select: {
                groups: [
                  {
                    label: 'Hệ đào tạo',
                    options: formatFacultyOptions(UseData().facultyList)
                  }
                ]
              }
            }
          },
          {
            type: 'select',
            placeholder: 'Chọn loại bằng',
            name: 'certificateType',
            setting: {
              select: {
                groups: [
                  {
                    label: 'Bằng tốt nghiệp',
                    options: CERTIFICATE_TYPE_OPTIONS
                  }
                ]
              }
            }
          },
          {
            type: 'input',
            name: 'course',
            placeholder: 'Nhập năm nhập học',
            setting: {
              input: {
                type: 'number'
              }
            }
          },
          {
            type: 'select',
            name: 'signed',
            placeholder: 'Chọn trạng thái ký',
            setting: {
              select: {
                groups: [
                  {
                    label: undefined,
                    options: [
                      { value: 'true', label: 'Đã ký' },
                      { value: 'false', label: 'Chưa ký' }
                    ]
                  }
                ]
              }
            }
          }
        ]}
        handleSetFilter={setFilter}
      />
      <TableList
        children={[
          { header: 'Mã SV', value: 'studentCode', className: 'min-w-[80px] font-semibold text-blue-500' },
          { header: 'Họ và tên', value: 'studentName', className: 'min-w-[200px]' },
          { header: 'Tên khoa', value: 'facultyName', className: 'min-w-[150px]' },
          {
            header: 'Phân loại',
            value: 'isDegree',
            render: (item) => {
              return item.isDegree ? (
                <div className='flex items-center gap-2'>
                  <Badge>Văn bằng</Badge>
                  <Badge className='bg-blue-500 text-white hover:bg-blue-400'> {item.certificateType}</Badge>
                </div>
              ) : (
                <Badge variant='outline'>Chứng chỉ</Badge>
              )
            }
          },
          { header: 'Tên tài liệu', value: 'name', className: 'min-w-[100px]' },
          { header: 'Ngày cấp', value: 'date', className: 'min-w-[100px]' },
          {
            header: 'Trạng thái ký',
            value: 'signed',
            className: 'min-w-[100px]',
            render: (item) => (
              <Badge variant={item.signed ? 'default' : 'outline'}>{item.signed ? 'Đã ký' : 'Chưa ký'}</Badge>
            )
          },
          {
            header: 'Hành động',
            value: 'action',

            render: (item) => (
              <Link href={`/education-admin/certificate-management/${item.id}`}>
                <Button size={'icon'} variant={'outline'}>
                  <EyeIcon />
                </Button>
              </Link>
            )
          }
        ]}
        data={queryCertificates.data?.data || []}
      />
      <CommonPagination
        page={queryCertificates.data?.page || 1}
        totalPage={queryCertificates.data?.total_page || 1}
        handleChangePage={(page) => {
          setFilter({ ...filter, page })
        }}
      />
      <DetailDialog
        children={[
          {
            type: 'query_select',
            placeholder: 'Nhập và chọn mã sinh viên',
            name: 'studentCode',
            setting: {
              querySelect: {
                queryFn: (keyword: string) => searchStudentByCode(keyword)
              }
            },
            label: 'Mã sinh viên',
            validator: validateNoEmpty('Mã sinh viên')
          },
          {
            type: 'select',
            placeholder: 'Chọn loại bằng',
            name: 'certificateType',
            setting: {
              select: {
                groups: [
                  {
                    label: undefined,
                    options: CERTIFICATE_TYPE_OPTIONS
                  }
                ]
              }
            },
            label: 'Loại bằng',
            validator: validateNoEmpty('Loại bằng')
          },
          {
            type: 'input',
            placeholder: 'Nhập tên bằng',
            name: 'name',
            label: 'Tên bằng',
            validator: validateNoEmpty('Tên bằng')
          },
          {
            type: 'input',
            name: 'serialNumber',
            placeholder: 'Nhập số hiệu',
            label: 'Số hiệu',
            validator: validateNoEmpty('Số hiệu')
          },
          {
            type: 'input',
            name: 'regNo',
            placeholder: 'Nhập số vào sổ gốc cấp văn bằng',
            label: 'Số vào sổ gốc cấp văn bằng',
            validator: validateNoEmpty('Số vào sổ gốc cấp văn bằng')
          },
          {
            type: 'input',
            name: 'date',
            placeholder: 'Nhập ngày cấp',
            label: 'Ngày cấp',
            validator: validateNoEmpty('Ngày cấp'),
            setting: {
              input: {
                type: 'date'
              }
            }
          }
        ]}
        data={[]}
        mode={idDetail === null ? 'create' : undefined}
        handleSubmit={handleCreateCertificate}
        handleClose={handleCloseDialog}
      />
    </>
  )
}

export default CertificateManagementPage
