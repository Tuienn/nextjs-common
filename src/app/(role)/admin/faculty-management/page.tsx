'use client'
import DeleteDialog from '@/components/role/admin/delete-dialog'
import TableList from '@/components/role/admin/table'
import { ADMIN_PAGE_TITLE, DETAIL_DIALOG_TITLE } from '@/constants/common'
import UseAdminStore from '@/stores/admin-store'
import useSWR from 'swr'
import DetailDialog from '@/components/role/admin/detail-dialog'
import { Button } from '@/components/ui/button'
import { createFaculty, deleteFaculty, getAllFaculties, getFacultyById, updateFaculty } from '@/lib/api/faculty'
import { FACULTY_LABEL_HEADER } from '@/constants/common'
import { validateString, validateTrainingPeriod } from '@/lib/utils/validators'
const FacultyManagement = () => {
  const { id, setId, filterSearch } = UseAdminStore()
  const queryFaculty = useSWR(filterSearch, getAllFaculties)

  const queryFacultyById = useSWR(id, () => getFacultyById(id as string))

  return (
    <div className='container mt-[80px]'>
      <div className='mb-3 flex items-center justify-between'>
        <h2>{ADMIN_PAGE_TITLE.FACULTY_MANAGEMENT}</h2>
        <Button onClick={() => setId(null)}>Thêm khoa</Button>
      </div>
      <TableList
        headers={[
          {
            className: 'w-[250px]',
            label: FACULTY_LABEL_HEADER.id,
            value: 'id'
          },
          {
            className: 'w-[120px]',
            label: FACULTY_LABEL_HEADER.code,
            value: 'code'
          },
          {
            className: 'w-[220px]',
            label: FACULTY_LABEL_HEADER.name,
            value: 'name'
          },

          {
            className: 'w-[180px]',
            label: FACULTY_LABEL_HEADER.trainingPeriod,
            value: 'trainingPeriod'
          }
        ]}
        data={queryFaculty.data || []}
      />
      <DeleteDialog handleDelete={deleteFaculty} />
      <DetailDialog
        title={DETAIL_DIALOG_TITLE.FACULTY_MANAGEMENT}
        formItems={[
          {
            name: 'code',
            type: 'input',
            placeholder: 'Nhập mã khoa',
            label: FACULTY_LABEL_HEADER.code,
            validator: validateString
          },
          {
            name: 'name',
            type: 'input',
            placeholder: 'Nhập tên khoa',
            label: FACULTY_LABEL_HEADER.name,
            validator: validateString
          },
          {
            name: 'trainingPeriod',
            type: 'input',
            placeholder: 'Nhập thời gian đào tạo',
            label: FACULTY_LABEL_HEADER.trainingPeriod,
            validator: validateTrainingPeriod,
            setting: {
              input: {
                type: 'number'
              }
            }
          }
        ]}
        handleCreate={createFaculty}
        handleUpdate={updateFaculty}
        data={queryFacultyById.data}
      />
    </div>
  )
}

export default FacultyManagement
