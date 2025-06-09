import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Book, Mail, Calendar, ChartAreaIcon, AwardIcon, User, School, Library } from 'lucide-react'
import FastView from '@/components/common/fast-view'

export default function StudentDashboard() {
  const fastViewData = {
    gpa: 8.5,
    numberOfSubjects: 59,
    status: 'Đang học'
  }
  const mainData = {
    schoolName: 'Đại học Bách Khoa Hà Nội',
    name: 'Nguyễn Văn A',
    studentCode: 'SV0001',
    email: 'student@example.edu',
    faculty: 'Công nghệ thông tin',
    yearOfAdmission: 2023
  }
  return (
    <div>
      {/* Statistics Section */}
      <h2>Thông tin cá nhân</h2>

      <div className='my-4 flex flex-col gap-4 sm:flex-row'>
        <FastView
          title='GPA'
          value={fastViewData.gpa}
          icon={<ChartAreaIcon className='text-blue-500' />}
          color='text-blue-500'
        />
        <FastView
          title='Số môn đã học'
          value={fastViewData.numberOfSubjects}
          icon={<Book className='text-green-500' />}
          color='text-green-500'
        />
        <FastView
          title='Trạng thái'
          value={<Badge>{fastViewData.status}</Badge>}
          icon={<AwardIcon />}
          color='text-green-500'
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
          <p className='text-sm text-gray-500'>Thông tin chi tiết về hồ sơ sinh viên</p>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='flex items-center space-x-2'>
            <School className='h-5 w-5 text-gray-500' />
            <div>
              <p className='mb-1 text-sm font-medium'>Trường/Học viện</p>
              <p className='text-sm text-gray-500'>{mainData.schoolName}</p>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <User className='h-5 w-5 text-gray-500' />
            <div>
              <p className='mb-1 text-sm font-medium'>Họ và tên</p>
              <p className='text-sm text-gray-500'>{mainData.name}</p>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Book className='h-5 w-5 text-gray-500' />
            <div>
              <p className='mb-1 text-sm font-medium'>Mã sinh viên</p>
              <p className='text-sm text-gray-500'>{mainData.studentCode}</p>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Mail className='h-5 w-5 text-gray-500' />
            <div>
              <p className='mb-1 text-sm font-medium'>Email</p>
              <p className='text-sm text-gray-500'>{mainData.email}</p>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Library className='h-5 w-5 text-gray-500' />
            <div>
              <p className='mb-1 text-sm font-medium'>Ngành học</p>
              <p className='text-sm text-gray-500'>{mainData.faculty}</p>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Calendar className='h-5 w-5 text-gray-500' />
            <div>
              <p className='mb-1 text-sm font-medium'>Năm nhập học</p>
              <p className='text-sm text-gray-500'>{mainData.yearOfAdmission}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
