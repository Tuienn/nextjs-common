'use client'

import PageHeader from '@/components/common/page-header'
import CommonPagination from '@/components/common/pagination'
import { UseData } from '@/components/providers/data-provider'
import DetailDialog from '@/components/role/education-admin/detail-dialog'
import Filter from '@/components/role/education-admin/filter'
import TableActionButton from '@/components/role/education-admin/table-action-button'
import TableList from '@/components/role/education-admin/table-list'
import UploadButton from '@/components/role/education-admin/upload-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PAGE_SIZE, STUDENT_STATUS_OPTIONS } from '@/constants/common'
import { toast } from '@/hooks/use-toast'
import {
  createStudent,
  deleteStudent,
  getStudentById,
  importExcel,
  searchStudent,
  updateStudent
} from '@/lib/api/student'
import { toastNoti } from '@/lib/utils/common'
import { formatFacultyOptions, formatStudent } from '@/lib/utils/format-api'

import { validateAcademicEmail } from '@/lib/utils/validators'
import { PlusIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import z from 'zod'

const StudentManagementPage = () => {
  const [idDetail, setIdDetail] = useState<string | null | undefined>(undefined)

  const [filter, setFilter] = useState<any>({})
  const handleCloseDetailDialog = useCallback(() => {
    setIdDetail(undefined)
  }, [])

  const handleChangePage = useCallback(
    (page: number) => {
      setFilter({ ...filter, page })
    },
    [filter]
  )

  const queryStudents = useSWR('students' + JSON.stringify(filter), () =>
    searchStudent({
      ...formatStudent(filter, true),
      page: filter.page || 1,
      page_size: PAGE_SIZE
    })
  )

  const queryStudentDetail = useSWR(idDetail, () => getStudentById(idDetail as string), {
    onError: (error) => {
      toast(toastNoti('error', error.message || 'Lỗi khi lấy thông tin sinh viên'))
    }
  })

  const mutateCreateStudent = useSWRMutation('create-student', (_key, { arg }: { arg: any }) => createStudent(arg), {
    onSuccess: () => {
      toast(toastNoti('success', 'Thêm sinh viên thành công'))
      queryStudents.mutate()
      setIdDetail(undefined)
    },
    onError: (error) => {
      toast(toastNoti('error', error.message || 'Lỗi khi thêm sinh viên'))
    }
  })

  const mutateUpdateStudent = useSWRMutation(
    'update-student',
    (_key, { arg }: { arg: any }) => updateStudent(idDetail as string, arg),
    {
      onSuccess: () => {
        toast(toastNoti('success', 'Cập nhật sinh viên thành công'))
        queryStudents.mutate()
        setIdDetail(undefined)
      },
      onError: (error) => {
        toast(toastNoti('error', error.message || 'Lỗi khi cập nhật sinh viên'))
      }
    }
  )

  const mutateDeleteStudent = useSWRMutation('delete-student', (_key, { arg }: { arg: any }) => deleteStudent(arg), {
    onSuccess: () => {
      toast(toastNoti('success', 'Xóa sinh viên thành công'))
      queryStudents.mutate()
      setIdDetail(undefined)
    },
    onError: (error) => {
      toast(toastNoti('error', error.message || 'Lỗi khi xóa sinh viên'))
    }
  })

  const mutateImportExcel = useSWRMutation('import-excel', (_key, { arg }: { arg: any }) => importExcel(arg), {
    onSuccess: (data) => {
      toast(toastNoti('success', 'Tải tệp lên thành công'))
      queryStudents.mutate()
    },
    onError: (error) => {
      toast(toastNoti('error', error.message || 'Lỗi khi tải tệp lên'))
    }
  })
  const handleDelete = useCallback((id: string) => {
    mutateDeleteStudent.trigger(id)
  }, [])

  const handleSubmit = useCallback(
    (data: any) => {
      if (idDetail) {
        mutateUpdateStudent.trigger(data)
      } else {
        mutateCreateStudent.trigger(data)
      }
    },
    [idDetail]
  )

  const handleUpload = useCallback(
    (file: FormData) => {
      mutateImportExcel.trigger(file)
    },
    [mutateImportExcel]
  )

  return (
    <>
      <PageHeader
        title='Quản lý sinh viên'
        extra={[
          <UploadButton handleUpload={handleUpload} loading={mutateImportExcel.isMutating} />,
          <Button onClick={() => setIdDetail(null)}>
            <PlusIcon />
            <span className='hidden sm:block'>Thêm sinh viên</span>
          </Button>
        ]}
      />

      <Filter
        handleSetFilter={setFilter}
        children={[
          { type: 'input', name: 'code', placeholder: 'Nhập mã sinh viên' },
          {
            type: 'input',
            name: 'name',
            placeholder: 'Nhập họ và tên'
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
            type: 'input',
            name: 'year',
            placeholder: 'Nhập năm nhập học',
            setting: {
              input: {
                type: 'number'
              }
            }
          },
          {
            type: 'select',
            name: 'status',
            placeholder: 'Chọn trạng thái',
            setting: {
              select: {
                groups: [
                  {
                    label: undefined,
                    options: STUDENT_STATUS_OPTIONS
                  }
                ]
              }
            }
          }
        ]}
      />
      <TableList
        data={queryStudents.data?.data || []}
        children={[
          { header: 'Mã SV', value: 'code', className: 'min-w-[80px] font-semibold text-blue-500' },
          { header: 'Họ và tên', value: 'name', className: 'min-w-[200px]' },
          { header: 'Email', value: 'email', className: 'min-w-[200px]' },
          { header: 'Tên khoa', value: 'facultyName', className: 'min-w-[200px]' },
          { header: 'Năm nhập học', value: 'year', className: 'min-w-[150px]' },
          {
            header: 'Trạng thái',
            value: 'status',
            className: 'min-w-[150px]',
            render: (item) => (
              <Badge variant={item.status === 'true' ? 'default' : 'secondary'}>
                {item.status === 'true' ? 'Đã tốt nghiệp' : 'Đang học'}
              </Badge>
            )
          },
          {
            header: 'Hành động',
            value: 'action',
            className: 'min-w-[90px]',
            render: (item) => (
              <TableActionButton handleDelete={handleDelete} handleSetIdDetail={setIdDetail} id={item.id} />
            )
          }
        ]}
        page={filter.page || 1}
      />
      <CommonPagination
        page={queryStudents.data?.page || 1}
        totalPage={queryStudents.data?.total_page || 1}
        handleChangePage={handleChangePage}
      />
      <DetailDialog
        children={[
          {
            type: 'input',
            label: 'Mã sinh viên',
            name: 'code',
            validator: z.string().trim().nonempty({
              message: 'Mã sinh viên không được để trống'
            }),
            placeholder: 'VD: CT060111'
          },
          {
            type: 'input',
            label: 'Họ và tên',
            name: 'name',
            validator: z.string().trim().nonempty({
              message: 'Tên sinh viên không được để trống'
            }),
            placeholder: 'VD: Nguyễn Văn A'
          },
          {
            type: 'input',
            label: 'Email',
            name: 'email',
            validator: validateAcademicEmail,
            placeholder: 'VD: CT060111@actvn.edu.vn'
          },
          {
            type: 'select',
            label: 'Tên khoa',
            placeholder: 'Chọn chuyên ngành',
            name: 'faculty',
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
            type: 'input',
            label: 'Năm',
            name: 'year',
            setting: {
              input: {
                type: 'number'
              }
            },
            validator: z
              .number({
                message: 'Năm không hợp lệ (VD: 2025)'
              })
              .min(1900, {
                message: 'Năm đào tạo không thể nhỏ hơn 1900'
              })
              .max(new Date().getFullYear() + 1, {
                message: 'Năm đào tạo không thể quá hiện tại'
              }),
            defaultValue: new Date().getFullYear()
          },
          {
            type: 'select',
            label: 'Trạng thái',
            name: 'status',
            disabled: true,
            setting: {
              select: {
                groups: [
                  {
                    label: 'Trạng thái',
                    options: STUDENT_STATUS_OPTIONS
                  }
                ]
              }
            },
            placeholder: 'Không thể chỉnh sửa - Mặc định "Đang học"'
          }
        ]}
        data={queryStudentDetail.data || {}}
        handleSubmit={handleSubmit}
        mode={idDetail ? 'update' : idDetail === undefined ? undefined : 'create'}
        handleClose={handleCloseDetailDialog}
      />
    </>
  )
}

export default StudentManagementPage
