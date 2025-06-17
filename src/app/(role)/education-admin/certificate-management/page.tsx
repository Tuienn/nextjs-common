'use client'
import PageHeader from '@/components/common/page-header'
import CommonPagination from '@/components/common/pagination'
import { UseData } from '@/components/providers/data-provider'
import DetailDialog from '@/components/role/education-admin/detail-dialog'
import Filter from '@/components/role/education-admin/filter'
import TableList from '@/components/role/education-admin/table-list'
import UploadButton, { UploadButtonRef } from '@/components/role/education-admin/upload-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CERTIFICATE_TYPE_OPTIONS, PAGE_SIZE } from '@/constants/common'

import {
  createCertificate,
  getCertificateList,
  importCertificateExcel,
  uploadCertificate,
  uploadDegree
} from '@/lib/api/certificate'
import { searchStudentByCode } from '@/lib/api/student'
import { showNotification } from '@/lib/utils/common'
import { formatCertificate, formatFacultyOptions } from '@/lib/utils/format-api'
import { validateNoEmpty } from '@/lib/utils/validators'
import { EyeIcon, FileUpIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { useCallback } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const CertificateManagementPage = () => {
  const [idDetail, setIdDetail] = useState<string | null | undefined>(undefined)
  const [typeUpload, setTypeUpload] = useState<'degree' | 'certificate'>('degree')
  const [certificateName, setCertificateName] = useState<string>('')
  const uploadButtonRef = useRef<UploadButtonRef>(null)
  const [openUploadDialog, setOpenUploadDialog] = useState(false)

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

  const mutateUploadDegreeFile = useSWRMutation(
    'upload-certificate',
    (_, { arg }: { arg: FormData }) => uploadDegree(arg),
    {
      onSuccess: () => {
        showNotification('success', 'Tải tệp lên thành công')
        queryCertificates.mutate()
        setOpenUploadDialog(false)
        setCertificateName('')
        setTypeUpload('degree')
      },
      onError: (error) => {
        showNotification('error', error.message || 'Lỗi khi tải tệp lên')
      }
    }
  )
  const mutateUploadCertificateFile = useSWRMutation(
    'upload-certificate',
    (_, { arg }: { arg: FormData }) => uploadCertificate(arg, certificateName),
    {
      onSuccess: () => {
        showNotification('success', 'Tải tệp lên thành công')
        queryCertificates.mutate()
        setOpenUploadDialog(false)
        setCertificateName('')
        setTypeUpload('certificate')
      },
      onError: (error) => {
        showNotification('error', error.message || 'Lỗi khi tải tệp lên')
      }
    }
  )

  const handleUploadPDF = useCallback(() => {
    uploadButtonRef.current?.triggerUpload()
  }, [uploadButtonRef])

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
      if (typeUpload === 'degree') {
        mutateUploadDegreeFile.trigger(file)
      } else {
        mutateUploadCertificateFile.trigger(file)
      }
    },
    [mutateUploadCertificateFile, mutateUploadDegreeFile, typeUpload]
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
          <Dialog open={openUploadDialog} onOpenChange={setOpenUploadDialog}>
            <DialogTrigger>
              <Button variant={'outline'} title='Có hỗ trợ tải nhiều tệp cùng lúc'>
                <FileUpIcon />
                <span className='hidden sm:block'>Tải tệp (PDF)</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tải tệp PDF chứng chỉ/văn bằng</DialogTitle>
                <DialogDescription>
                  Nếu tải văn bằng thì tên tệp là <span className='font-bold'>số hiệu văn bằng</span>, nếu tải chứng chỉ
                  thì tên tệp là <span className='font-bold'>mã sinh viên</span>
                </DialogDescription>
              </DialogHeader>
              <Label>Chọn loại</Label>
              <Select defaultValue='degree' onValueChange={(value) => setTypeUpload(value as 'degree' | 'certificate')}>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn loại' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='degree'>Văn bằng</SelectItem>
                  <SelectItem value='certificate'>Chứng chỉ</SelectItem>
                </SelectContent>
              </Select>
              {typeUpload === 'certificate' && (
                <>
                  <Label>Tên tệp</Label>
                  <Input
                    value={certificateName}
                    onChange={(e) => setCertificateName(e.target.value)}
                    placeholder='Nhập tên tệp'
                  />
                </>
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={'outline'}>Hủy bỏ</Button>
                </DialogClose>
                <Button
                  onClick={handleUploadPDF}
                  disabled={mutateUploadDegreeFile.isMutating || mutateUploadCertificateFile.isMutating}
                >
                  Tải tệp
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ]}
      />
      <div className='hidden'>
        <UploadButton
          handleUpload={handleUpload}
          loading={mutateUploadDegreeFile.isMutating || mutateUploadCertificateFile.isMutating}
          ref={uploadButtonRef}
        />
      </div>
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
