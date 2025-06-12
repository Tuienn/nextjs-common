'use client'

import CertificateBlankButton from '@/components/common/certificate-blank-button'
import CertificateView from '@/components/common/certificate-view'
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
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { CERTIFICATE_TYPE_OPTIONS, PAGE_SIZE } from '@/constants/common'
import { toast } from '@/hooks/use-toast'
import {
  createCertificate,
  getCertificateDataById,
  getCertificateFile,
  getCertificateList,
  importCertificateExcel,
  uploadCertificate
} from '@/lib/api/certificate'
import { searchStudentByCode } from '@/lib/api/student'
import { toastNoti } from '@/lib/utils/common'
import { formatCertificate, formatFacultyOptions } from '@/lib/utils/format-api'
import { validateNoEmpty } from '@/lib/utils/validators'
import { CertificateType } from '@/types/common'
import { DialogTitle } from '@radix-ui/react-dialog'
import { FileIcon, FileUpIcon, PlusIcon } from 'lucide-react'
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

  const queryCertificates = useSWR('certificates' + JSON.stringify(filter), () =>
    getCertificateList({
      ...formatCertificate(filter, true),
      page: filter.page || 1,
      page_size: PAGE_SIZE,
      faculty_code: filter.faculty || undefined,
      signed: filter.signed || undefined,
      course: filter.course || undefined
    })
  )

  const mutateCreateStudent = useSWRMutation('create-certificate', (_, { arg }: any) => createCertificate(arg), {
    onSuccess: () => {
      toast(toastNoti('success', 'Cấp chứng chỉ thành công'))
      queryCertificates.mutate()
      handleCloseDialog()
    },
    onError: (error) => {
      toast(toastNoti('error', error.message || 'Cấp chứng chỉ thất bại'))
    }
  })

  const mutateUploadCertificateFile = useSWRMutation(
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

  const mutateImportCertificateExcel = useSWRMutation(
    'import-certificate-excel',
    (_, { arg }: { arg: FormData }) => importCertificateExcel(arg),
    {
      onSuccess: () => {
        toast(toastNoti('success', 'Nhập tệp excel thành công'))
        queryCertificates.mutate()
      },
      onError: (error) => {
        toast(toastNoti('error', error.message || 'Lỗi khi nhập tệp excel'))
      }
    }
  )

  const queryCertificateDetail = useSWR(idDetail, () => getCertificateDataById(idDetail as string))

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
    mutateCreateStudent.trigger(data)
  }, [])

  return (
    <>
      <PageHeader
        title='Quản lý chứng chỉ'
        extra={[
          <UploadButton
            handleUpload={handleImportCertificateExcel}
            loading={mutateImportCertificateExcel.isMutating}
            title={'Tải văn bằng (Excel)'}
            icon={<FileUpIcon />}
          />,
          <Button onClick={() => setIdDetail(null)}>
            <PlusIcon />
            <span className='hidden sm:block'>Cấp chứng chỉ</span>
          </Button>,
          <UploadButton
            handleUpload={handleUpload}
            loading={mutateUploadCertificateFile.isMutating}
            title={'Tải văn bằng (PDF)'}
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
                    label: undefined,
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
          { header: 'Loại bằng', value: 'certificateType', className: 'min-w-[100px]' },
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

            render: (item) => <CertificateActionButton handleSetIdDetail={setIdDetail} id={item.id} />
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
          }
        ]}
        data={[]}
        mode={idDetail === null ? 'create' : undefined}
        handleSubmit={handleCreateCertificate}
        handleClose={handleCloseDialog}
      />

      <Dialog open={!!idDetail} onOpenChange={(open) => open || handleCloseDialog()}>
        <DialogContent className='max-h-[80vh] overflow-y-scroll'>
          <DialogHeader>
            <DialogTitle>{'Thông tin chứng chỉ'}</DialogTitle>
          </DialogHeader>
          <CertificateView data={queryCertificateDetail.data as CertificateType} />
          <DialogFooter>
            <CertificateBlankButton isIcon={false} action={() => getCertificateFile(idDetail as string)} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CertificateManagementPage
