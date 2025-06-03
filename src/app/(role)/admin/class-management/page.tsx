'use client'
import DeleteDialog from '@/components/role/admin/delete-dialog'
import Filter from '@/components/role/admin/filter'
import TableList from '@/components/role/admin/table'
import { ADMIN_PAGE_TITLE, CLASS_LABEL, CLASS_LABEL_HEADER, DETAIL_DIALOG_TITLE } from '@/constants/common'
import { searchStudentByKeyword } from '@/lib/api/student'
import UseAdminStore from '@/stores/admin-store'
import useSWR from 'swr'
import DetailDialog from '@/components/role/admin/detail-dialog'
import { Button } from '@/components/ui/button'
import { getAllFaculties } from '@/lib/api/faculty'
import { validateString } from '@/lib/utils/validators'
import { searchListClass, getClassById, deleteClass, createClass, updateClass } from '@/lib/api/class'

const ClassManagement = () => {
  const { filterSearch, id, setId } = UseAdminStore()
  const queryClasses = useSWR(filterSearch, () => searchListClass(filterSearch))

  const queryFaculty = useSWR('faculty', getAllFaculties, {
    revalidateIfStale: false
  })

  const queryClassById = useSWR(id, () => getClassById(id as string))

  return (
    <div className='container mt-[80px]'>
      <div className='mb-3 flex items-center justify-between'>
        <h2>{ADMIN_PAGE_TITLE.CLASS_MANAGEMENT}</h2>
        <Button onClick={() => setId(null)}>Thêm lớp</Button>
      </div>
      <Filter
        title='Tìm kiếm lớp'
        formItems={[
          {
            name: 'id',
            type: 'query_select',
            placeholder: 'Nhập ' + CLASS_LABEL.id,
            setting: {
              querySelect: {
                queryFn: searchStudentByKeyword
              }
            }
          },
          {
            name: 'code',
            type: 'input',
            placeholder: 'Nhập ' + CLASS_LABEL.code
          }
        ]}
      />
      <TableList
        headers={[
          {
            className: 'w-[150px]',
            label: CLASS_LABEL_HEADER.id,
            value: 'id'
          },
          {
            className: 'w-[120px]',
            label: CLASS_LABEL_HEADER.code,
            value: 'code'
          },
          {
            className: 'w-[150px]',
            label: CLASS_LABEL_HEADER.course,
            value: 'course'
          },

          {
            className: 'w-[150px]',
            label: CLASS_LABEL_HEADER.majorCode,
            value: 'majorCode'
          },
          {
            className: 'w-[150px]',
            label: CLASS_LABEL_HEADER.majorName,
            value: 'majorName'
          }
        ]}
        data={queryClasses.data || []}
      />
      <DeleteDialog handleDelete={deleteClass} />
      <DetailDialog
        title={DETAIL_DIALOG_TITLE.STUDENT_MANAGEMENT}
        formItems={[
          {
            name: 'code',
            type: 'input',
            placeholder: 'Nhập ' + CLASS_LABEL.code,
            label: CLASS_LABEL_HEADER.code,
            validator: validateString
          },
          {
            name: 'course',
            type: 'input',
            placeholder: 'Nhập ' + CLASS_LABEL.course,
            label: CLASS_LABEL_HEADER.course,
            validator: validateString
          },
          {
            name: 'majorId',
            type: 'select',
            placeholder: 'Chọn ' + CLASS_LABEL.majorCode,
            label: CLASS_LABEL_HEADER.majorCode,

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
            }
          }
        ]}
        handleCreate={createClass}
        handleUpdate={updateClass}
        data={queryClassById.data}
      />
    </div>
  )
}

export default ClassManagement
