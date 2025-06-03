'use client'
import DeleteDialog from '@/components/role/admin/delete-dialog'
import Filter from '@/components/role/admin/filter'
import TableList from '@/components/role/admin/table'
import { ADMIN_PAGE_TITLE, DETAIL_DIALOG_TITLE } from '@/constants/common'
import UseAdminStore from '@/stores/admin-store'
import useSWR from 'swr'
import DetailDialog from '@/components/role/admin/detail-dialog'
import { Button } from '@/components/ui/button'
import { getAllFaculties } from '@/lib/api/faculty'
import { createSubject, deleteSubject, getSubjectById, searchListSubject, updateSubject } from '@/lib/api/subject'
import { validateCredit, validateString } from '@/lib/utils/validators'
import UploadButton from '@/components/role/admin/upload-button'
import { createLecturer, deleteLecturer, searchListLecturer, updateLecturer } from '@/lib/api/lecturer'
import { getLecturerById } from '@/lib/api/lecturer'

const LecturerManagement = () => {
  const { filterSearch, id, setId } = UseAdminStore()

  const queryLecturerList = useSWR(filterSearch, () => searchListLecturer(filterSearch))
  const queryLecturerById = useSWR(id, () => getLecturerById(id as string))
  const queryFaculty = useSWR('faculty', getAllFaculties)

  return (
    <div className='container mt-[80px]'>
      <div className='mb-3 flex items-center justify-between'>
        <h2>{ADMIN_PAGE_TITLE.LECTURER_MANAGEMENT}</h2>
        <Button onClick={() => setId(null)}>Thêm giảng viên</Button>
      </div>
      <Filter
        title='Tìm kiếm giảng viên'
        formItems={[
          {
            name: 'id',
            type: 'input',
            placeholder: 'Nhập ID'
          },
          {
            name: 'name',
            type: 'input',
            placeholder: 'Nhập tên giảng viên'
          },
          {
            name: 'email',
            type: 'input',
            placeholder: 'Nhập email'
          },
          {
            name: 'title',
            type: 'input',
            placeholder: 'Nhập chức vụ'
          },
          {
            name: 'faculty_id',
            type: 'input',
            placeholder: 'Chọn mã khoa',
            setting: {
              select: {
                groups: [
                  {
                    label: 'Hệ đào tạo',
                    options: queryFaculty.data?.map((item: any) => ({
                      label: item.name,
                      value: item.id
                    }))
                  }
                ]
              }
            },
            validator: validateString
          }
        ]}
      />
      <TableList
        headers={[
          {
            className: 'w-[200px]',
            label: 'ID',
            value: 'id'
          },
          {
            className: 'w-[120px]',
            label: 'Mã giảng viên',
            value: 'code'
          },
          {
            className: 'w-[120px]',
            label: 'Họ tên giảng viên',
            value: 'full_name'
          },
          {
            className: 'w-[220px]',
            label: 'Email',
            value: 'email'
          },

          {
            className: 'w-[80px]',
            label: 'Chức vụ',
            value: 'title'
          }
        ]}
        data={queryLecturerList.data || []}
      />
      <DeleteDialog handleDelete={deleteLecturer} />
      <DetailDialog
        title={DETAIL_DIALOG_TITLE.STUDENT_MANAGEMENT}
        formItems={[
          {
            name: 'full_name',
            type: 'input',
            placeholder: 'Nhập tên giảng viên',
            label: 'Tên giảng viên',
            validator: validateString
          },
          {
            name: 'email',
            type: 'input',
            placeholder: 'Nhập email',
            label: 'Email',
            validator: validateString
          },
          {
            name: 'title',
            type: 'input',
            placeholder: 'Nhập chức vụ',
            label: 'Chức vụ',

            validator: validateString
          },
          {
            name: 'faculty_id',
            type: 'input',
            placeholder: 'Chọn mã khoa',
            setting: {
              select: {
                groups: [
                  {
                    label: 'Hệ đào tạo',
                    options: queryFaculty.data?.map((item: any) => ({
                      label: item.name,
                      value: item.id
                    }))
                  }
                ]
              }
            },
            validator: validateString
          }
        ]}
        handleCreate={createLecturer}
        handleUpdate={updateLecturer}
        data={queryLecturerById.data || []}
      />
    </div>
  )
}

export default LecturerManagement
