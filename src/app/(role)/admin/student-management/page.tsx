'use client'
import DeleteDialog from '@/components/role/admin/delete-dialog'
import Filter from '@/components/role/admin/filter'
import TableList from '@/components/role/admin/table'
import { ADMIN_PAGE_TITLE, DETAIL_DIALOG_TITLE } from '@/constants/common'
import { ETHNICITY_GROUPS, GENDER_GROUPS, STUDENT_LABEL, STUDENT_LABEL_HEADER } from '@/constants/common'
import {
  createStudent,
  deleteStudent,
  getStudentById,
  searchListStudent,
  searchStudentByKeyword,
  updateStudent
} from '@/lib/api/student'
import UseAdminStore from '@/stores/admin-store'
import useSWR from 'swr'
import DetailDialog from '@/components/role/admin/detail-dialog'
import { Button } from '@/components/ui/button'
import { getAllFaculties } from '@/lib/api/faculty'
import { formatFacultyOptions } from '@/lib/utils/format-api'
import { validateAcademyEmail, validateString } from '@/lib/utils/validators'
import UploadButton from '@/components/role/admin/upload-button'

const StudentManagement = () => {
  const { filterSearch, id, setId } = UseAdminStore()
  const queryStudent = useSWR(filterSearch, () => searchListStudent(filterSearch))
  const queryFaculty = useSWR('faculty', getAllFaculties, {
    revalidateIfStale: false
  })

  const queryStudentById = useSWR(id, () => getStudentById(id as string))

  return (
    <div className='container mt-[80px]'>
      <div className='mb-3 flex items-center justify-between'>
        <h2>{ADMIN_PAGE_TITLE.STUDENT_MANAGEMENT}</h2>
        <div className='flex flex-col items-center gap-2 sm:flex-row'>
          <UploadButton api='users/import-excel' />
          <Button onClick={() => setId(null)}>Thêm sinh viên</Button>
        </div>
      </div>
      <Filter
        title='Tìm kiếm sinh viên'
        formItems={[
          {
            name: 'id',
            type: 'query_select',
            placeholder: 'Nhập ' + STUDENT_LABEL.id,
            setting: {
              querySelect: {
                queryFn: searchStudentByKeyword
              }
            }
          },
          {
            name: 'studentCode',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.studentCode
          },
          {
            name: 'fullName',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.fullName
          },
          {
            name: 'personalEmail',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.personalEmail
          },
          {
            name: 'email',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.email
          },
          {
            name: 'ethnicity',
            type: 'search_select',
            placeholder: 'Chọn ' + STUDENT_LABEL.ethnicity,
            setting: {
              select: {
                groups: ETHNICITY_GROUPS
              }
            }
          },
          {
            name: 'gender',
            type: 'select',
            placeholder: 'Chọn ' + STUDENT_LABEL.gender,
            setting: {
              select: {
                groups: GENDER_GROUPS
              }
            }
          },
          {
            name: 'major',
            type: 'select',
            placeholder: 'Chọn ' + STUDENT_LABEL.major,
            setting: {
              select: {
                groups: [
                  {
                    label: 'Hệ đào tạo',
                    options: formatFacultyOptions(queryFaculty.data || [])
                  }
                ]
              }
            }
          },
          {
            name: 'class',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.class
          },
          {
            name: 'course',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.course
          },
          {
            name: 'nationalId',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.nationalId
          },
          {
            name: 'address',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.address
          },
          {
            name: 'placeOfBirth',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.placeOfBirth
          },
          {
            name: 'dateOfBirth',
            type: 'input',
            placeholder: 'Chọn ' + STUDENT_LABEL.dateOfBirth,
            setting: {
              input: {
                type: 'date'
              }
            }
          },
          {
            name: 'phoneNumber',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.phoneNumber
          }
        ]}
      />
      <TableList
        headers={[
          {
            className: 'w-[100px]',
            label: STUDENT_LABEL_HEADER.id,
            value: 'id'
          },
          {
            className: 'w-[120px]',
            label: STUDENT_LABEL_HEADER.studentCode,
            value: 'studentCode'
          },
          {
            className: 'w-[180px]',
            label: STUDENT_LABEL_HEADER.fullName,
            value: 'fullName'
          },

          {
            className: 'w-[80px]',
            label: STUDENT_LABEL_HEADER.gender,
            value: 'gender'
          },
          {
            className: 'w-[150px]',
            label: STUDENT_LABEL_HEADER.major,
            value: 'major'
          },
          {
            className: 'w-[80px]',
            label: STUDENT_LABEL_HEADER.class,
            value: 'class'
          },
          {
            className: 'w-[120px]',
            label: STUDENT_LABEL_HEADER.course,
            value: 'course'
          },
          {
            className: 'w-[120px]',
            label: STUDENT_LABEL_HEADER.address,
            value: 'address'
          },
          {
            className: 'w-[120px]',
            label: STUDENT_LABEL_HEADER.placeOfBirth,
            value: 'placeOfBirth'
          },
          {
            className: 'w-[120px]',
            label: STUDENT_LABEL_HEADER.dateOfBirth,
            value: 'dateOfBirth'
          },
          {
            className: 'w-[120px]',
            label: STUDENT_LABEL_HEADER.phoneNumber,
            value: 'phoneNumber'
          }
        ]}
        data={queryStudent.data || []}
      />
      <DeleteDialog handleDelete={deleteStudent} />
      <DetailDialog
        title={DETAIL_DIALOG_TITLE.STUDENT_MANAGEMENT}
        formItems={[
          {
            name: 'studentCode',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.studentCode,
            label: STUDENT_LABEL_HEADER.studentCode,
            validator: validateString
          },
          {
            name: 'fullName',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.fullName,
            label: STUDENT_LABEL_HEADER.fullName,
            validator: validateString
          },
          {
            name: 'email',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.email,
            label: STUDENT_LABEL_HEADER.email,
            validator: validateAcademyEmail
          },
          {
            name: 'ethnicity',
            type: 'select',
            placeholder: 'Chọn ' + STUDENT_LABEL.ethnicity,
            label: STUDENT_LABEL_HEADER.ethnicity,
            setting: {
              select: {
                groups: ETHNICITY_GROUPS
              }
            },
            validator: validateString
          },
          {
            name: 'gender',
            type: 'select',
            placeholder: 'Chọn ' + STUDENT_LABEL.gender,
            label: STUDENT_LABEL_HEADER.gender,
            setting: {
              select: {
                groups: GENDER_GROUPS
              }
            },
            validator: validateString
          },
          {
            name: 'major',
            type: 'select',
            placeholder: 'Chọn ' + STUDENT_LABEL.major,
            label: STUDENT_LABEL_HEADER.major,
            setting: {
              select: {
                groups: [
                  {
                    label: 'Hệ đào tạo',
                    options: formatFacultyOptions(queryFaculty.data || [])
                  }
                ]
              }
            },
            validator: validateString
          },
          {
            name: 'class',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.class,
            label: STUDENT_LABEL_HEADER.class,
            validator: validateString
          },
          {
            name: 'course',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.course,
            label: STUDENT_LABEL_HEADER.course,
            validator: validateString
          },
          {
            name: 'nationalId',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.nationalId,
            label: STUDENT_LABEL_HEADER.nationalId,
            validator: validateString
          },
          {
            name: 'address',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.address,
            label: STUDENT_LABEL_HEADER.address,
            validator: validateString
          },
          {
            name: 'placeOfBirth',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.placeOfBirth,
            label: STUDENT_LABEL_HEADER.placeOfBirth,
            validator: validateString
          },
          {
            name: 'dateOfBirth',
            type: 'input',
            placeholder: 'Chọn ' + STUDENT_LABEL.dateOfBirth,
            label: STUDENT_LABEL_HEADER.dateOfBirth,
            setting: {
              input: {
                type: 'date'
              }
            }
          },
          {
            name: 'phoneNumber',
            type: 'input',
            placeholder: 'Nhập ' + STUDENT_LABEL.phoneNumber,
            label: STUDENT_LABEL_HEADER.phoneNumber,
            validator: validateString
          }
        ]}
        handleCreate={createStudent}
        handleUpdate={updateStudent}
        data={queryStudentById.data}
      />
    </div>
  )
}

export default StudentManagement
