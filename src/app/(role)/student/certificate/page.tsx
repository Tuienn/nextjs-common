import CommonPagination from '@/components/common/pagination'
import TableList from '@/components/role/admin/table-list'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { EyeIcon, PackagePlusIcon } from 'lucide-react'

const StudentCertificatePage = () => {
  const data = [
    {
      hash: '1234567890',
      createdAt: '2021-01-01 08:30:15',
      expiredAt: '0.5h',
      permissionType: ['Điểm', 'Văn bằng'],
      status: true
    },
    {
      hash: '2345678901',
      createdAt: '2021-02-15 14:22:45',
      expiredAt: '1h',
      permissionType: ['Điểm', 'Văn bằng'],
      status: true
    },
    {
      hash: '3456789012',
      createdAt: '2021-03-20 09:15:30',
      expiredAt: '5h',
      permissionType: ['Văn bằng'],
      status: false
    },
    {
      hash: '4567890123',
      createdAt: '2021-04-10 11:45:20',
      expiredAt: '10h',
      permissionType: ['Điểm'],
      status: true
    },
    {
      hash: '5678901234',
      createdAt: '2021-05-05 16:10:55',
      expiredAt: '24h',
      permissionType: ['Điểm', 'Văn bằng'],
      status: false
    },
    {
      hash: '6789012345',
      createdAt: '2021-06-15 13:25:40',
      expiredAt: '0.5h',
      permissionType: ['Văn bằng'],
      status: true
    },
    {
      hash: '7890123456',
      createdAt: '2021-07-20 10:50:25',
      expiredAt: '1h',
      permissionType: ['Điểm'],
      status: true
    },
    {
      hash: '8901234567',
      createdAt: '2021-08-01 15:35:10',
      expiredAt: '5h',
      permissionType: ['Điểm', 'Văn bằng'],
      status: false
    },
    {
      hash: '9012345678',
      createdAt: '2021-09-10 12:05:35',
      expiredAt: '10h',
      permissionType: ['Văn bằng'],
      status: true
    },
    {
      hash: '0123456789',
      createdAt: '2021-10-15 17:40:50',
      expiredAt: '24h',
      permissionType: ['Điểm', 'Văn bằng'],
      status: true
    }
  ]
  return (
    <>
      <div className='flex items-center justify-between'>
        <h2>Thông tin chứng chỉ</h2>

        <div className='flex items-center gap-2'>
          <Button variant={'outline'}>
            <EyeIcon /> <span className='hidden sm:block'>Xem chứng chỉ</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PackagePlusIcon />
                <span className='hidden sm:block'>Tạo mã xác minh</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo mã xác minh</DialogTitle>
                <DialogDescription>
                  Mã xác minh là một mã được tạo ra để xem điểm và văn bằng của sinh viên
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <TableList
        children={[
          { header: 'Mã xác minh', value: 'hash', className: 'min-w-[120px] font-semibold text-blue-500' },
          { header: 'Thời gian tạo', value: 'createdAt', className: 'min-w-[150px]' },
          { header: 'Hết hạn sau khi tạo', value: 'expiredAt', className: 'min-w-[100px]' },
          {
            header: 'Quyền hạn',
            value: 'permissionType',
            className: 'min-w-[150px]',
            render: (item) => (
              <div className='flex flex-wrap gap-2'>
                {item.permissionType.map((type: string, index: number) => (
                  <Badge key={index} variant={type === 'Điểm' ? 'outline' : 'default'}>
                    {type}
                  </Badge>
                ))}
              </div>
            )
          },
          {
            header: 'Trạng thái',
            value: 'status',
            className: 'min-w-[100px]',
            render: (item) => (
              <Badge variant={item.status ? 'default' : 'outline'}>{item.status ? 'Có hiệu lục' : 'Hết hạn'}</Badge>
            )
          }
        ]}
        data={data}
      />
      {/* <CommonPagination /> */}
    </>
  )
}

export default StudentCertificatePage
