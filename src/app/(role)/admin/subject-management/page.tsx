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

const StudentManagement = () => {
  const { filterSearch, id, setId } = UseAdminStore()

  const querySubjectList = useSWR(filterSearch, () => searchListSubject(filterSearch))
  const querySubjectById = useSWR(id, () => getSubjectById(id as string))
  const queryFaculty = useSWR('faculty', getAllFaculties)

  return (
    <div className='container mt-[80px]'>
      <div className='mb-3 flex items-center justify-between'>
        <h2>{ADMIN_PAGE_TITLE.COURSE_MANAGEMENT}</h2>
        <div className='flex flex-col items-center gap-2 sm:flex-row'>
          <UploadButton api='subjects/import' />
          <Button onClick={() => setId(null)}>Thêm môn học</Button>
        </div>
      </div>
      <Filter
        title='Tìm kiếm môn học'
        formItems={[
          {
            name: 'id',
            type: 'input',
            placeholder: 'Nhập ID'
          },
          {
            name: 'code',
            type: 'input',
            placeholder: 'Nhập mã môn học'
          },
          {
            name: 'name',
            type: 'input',
            placeholder: 'Nhập tên môn học'
          },
          {
            name: 'credit',
            type: 'input',
            placeholder: 'Nhập số tín chỉ',
            setting: {
              input: {
                type: 'number'
              }
            }
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
            label: 'Mã môn học',
            value: 'code'
          },
          {
            className: 'w-[220px]',
            label: 'Tên môn học',
            value: 'name'
          },

          {
            className: 'w-[80px]',
            label: 'Số tín chỉ',
            value: 'credit'
          },
          {
            className: 'w-[150px]',
            label: 'Mã khoa',
            value: 'majorCode'
          },
          {
            className: 'w-[280px]',
            label: 'Mô tả',
            value: 'description'
          }
        ]}
        data={querySubjectList.data || []}
      />
      <DeleteDialog handleDelete={deleteSubject} />
      <DetailDialog
        title={DETAIL_DIALOG_TITLE.STUDENT_MANAGEMENT}
        formItems={[
          {
            name: 'code',
            type: 'input',
            placeholder: 'Nhập mã môn học',
            label: 'Mã môn học',
            validator: validateString
          },
          {
            name: 'name',
            type: 'input',
            placeholder: 'Nhập tên môn học',
            label: 'Tên môn học',
            validator: validateString
          },
          {
            name: 'credit',
            type: 'input',
            placeholder: 'Nhập số tín chỉ',
            label: 'Số tín chỉ',
            setting: {
              input: {
                type: 'number'
              }
            },
            validator: validateCredit
          },
          {
            name: 'majorId',
            type: 'select',
            placeholder: 'Chọn mã khoa',
            label: 'Mã khoa',
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
          },
          {
            name: 'description',
            type: 'input',
            placeholder: 'Nhập mô tả',
            label: 'Mô tả',
            validator: validateString
          }
        ]}
        handleCreate={createSubject}
        handleUpdate={updateSubject}
        data={querySubjectById.data || []}
      />
    </div>
  )
}

export default StudentManagement
