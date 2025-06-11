'use client'

import CertificateView from '@/components/common/certificate-view'
import CommonPagination from '@/components/common/pagination'
import { UseData } from '@/components/providers/data-provider'
import CertificateActionButton from '@/components/role/admin/certificate-action-button'
import DetailDialog from '@/components/role/admin/detail-dialog'
import Filter from '@/components/role/admin/filter'
import TableList from '@/components/role/admin/table-list'
import UploadButton from '@/components/role/admin/upload-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { CERTIFICATE_TYPE_OPTIONS } from '@/constants/common'
import { toast } from '@/hooks/use-toast'
import { createCertificate, getCertificateList, uploadCertificate } from '@/lib/api/certificate'
import { searchStudentByCode } from '@/lib/api/student'
import { toastNoti } from '@/lib/utils/common'
import { formatFacultyOptions } from '@/lib/utils/format-api'
import { validateNoEmpty } from '@/lib/utils/validators'
import { DialogTitle } from '@radix-ui/react-dialog'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { useCallback } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const CertificateManagementPage = () => {
  const [idDetail, setIdDetail] = useState<string | null | undefined>(undefined)
  const [filter, setFilter] = useState<any>({})
  const handleCloseDetailDialog = useCallback(() => {
    setIdDetail(undefined)
  }, [])

  const queryCertificates = useSWR('certificates' + JSON.stringify(filter), () => getCertificateList(filter))

  const mutateCreateStudent = useSWRMutation('create-certificate', (_, { arg }: any) => createCertificate(arg), {
    onSuccess: () => {
      toast(toastNoti('success', 'Cấp chứng chỉ thành công'))
      queryCertificates.mutate()
      handleCloseDetailDialog()
    },
    onError: (error) => {
      toast(toastNoti('error', error.message || 'Cấp chứng chỉ thất bại'))
    }
  })

  const mutateUploadCertificate = useSWRMutation(
    'upload-certificate',
    (_, { arg }: { arg: FormData }) => uploadCertificate(arg),
    {
      onSuccess: () => {
        toast(toastNoti('success', 'Tải tệp lên thành công'))
        queryCertificates.mutate()
      },
      onError: (error) => {
        toast(toastNoti('error', error.message || 'Lỗi khi tải tệp lên'))
      }
    }
  )

  const handleUpload = useCallback(
    (file: FormData) => {
      mutateUploadCertificate.trigger(file)
    },
    [mutateUploadCertificate]
  )

  const handleCreateCertificate = useCallback((data: any) => {
    mutateCreateStudent.trigger(data)
  }, [])

  return (
    <>
      <div className='mb-4 flex items-center justify-between'>
        <h2>Quản lý chứng chỉ</h2>
        <div className='flex items-center gap-2'>
          <UploadButton handleUpload={handleUpload} loading={mutateUploadCertificate.isMutating} />
          <Button onClick={() => setIdDetail(null)}>
            <PlusIcon />
            <span className='hidden sm:block'>Cấp chứng chỉ</span>
          </Button>
        </div>
      </div>
      <Filter
        children={[
          {
            type: 'query_select',
            placeholder: 'Nhập và chọn mã sinh viên',
            name: 'code',
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
                    label: undefined,
                    options: CERTIFICATE_TYPE_OPTIONS
                  }
                ]
              }
            }
          },
          {
            type: 'input',
            name: 'year',
            placeholder: 'Nhập năm học',
            setting: {
              input: {
                type: 'number'
              }
            }
          },
          {
            type: 'select',
            name: 'status',
            placeholder: 'Chọn trạng thái kí',
            setting: {
              select: {
                groups: [
                  {
                    label: undefined,
                    options: [
                      { value: 'true', label: 'Đã kí' },
                      { value: 'false', label: 'Chưa kí' }
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
          { header: 'Chuyên ngành', value: 'facultyName', className: 'min-w-[150px]' },
          { header: 'Loại bằng', value: 'certificateType', className: 'min-w-[100px]' },
          { header: 'Ngày cấp', value: 'date', className: 'min-w-[100px]' },
          {
            header: 'Trạng thái kí',
            value: 'signed',
            className: 'min-w-[100px]',
            render: (item) => (
              <Badge variant={item.signed ? 'default' : 'outline'}>{item.signed ? 'Đã kí' : 'Chưa kí'}</Badge>
            )
          },
          {
            header: 'Hành động',
            value: 'action',

            render: (item) => <CertificateActionButton handleSetIdDetail={setIdDetail} id={item.id} />
          }
        ]}
        data={queryCertificates.data?.data || []}
      />
      <CommonPagination
        page={queryCertificates.data?.page || 1}
        total_page={queryCertificates.data?.total_page || 1}
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
            placeholder: 'Nhập số seri',
            label: 'Số seri',
            validator: validateNoEmpty('Số seri')
          },
          {
            type: 'input',
            name: 'regNo',
            placeholder: 'Nhập số đăng ký',
            label: 'Số đăng ký',
            validator: validateNoEmpty('Số đăng ký')
          }
        ]}
        data={[]}
        mode={idDetail === null ? 'create' : undefined}
        handleSubmit={handleCreateCertificate}
        handleClose={handleCloseDetailDialog}
      />
      <CertificateView
        universityName='Trường đại học Bách Khoa Hà Nội'
        universityCode='BKHN'
        facultyName='Khoa học máy tính'
        facultyCode='KHMT'
        studentCode='1234567890'
        studentName='Nguyễn Văn A'
        name='Bằng đại học'
        date='2021-01-01'
        certificateType='Bằng đại học'
        signed={true}
        serialNumber='1234567890'
        regNo='1234567890'
      />
    </>
  )
}

export default CertificateManagementPage
