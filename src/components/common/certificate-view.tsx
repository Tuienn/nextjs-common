import { CertificateType } from '@/types/common'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  data?: CertificateType
  className?: string
}

const CertificateView: React.FC<Props> = (props) => {
  return (
    <ul className={cn('grid gap-4', props.className)}>
      <li>
        <p className='text-sm font-semibold'>Trường đại học/Học viện</p>
        <p className='text-sm'>
          {props.data?.universityCode ?? <span className='italic text-gray-500'>Không có dữ liệu</span>} -{' '}
          {props.data?.universityName ?? <span className='italic text-gray-500'>Không có dữ liệu</span>}
        </p>
      </li>
      <li>
        <p className='text-sm font-semibold'>Sinh viên</p>
        <p className='text-sm'>
          {props.data?.studentCode ?? <span className='italic text-gray-500'>Không có dữ liệu</span>} -{' '}
          {props.data?.studentName ?? <span className='italic text-gray-500'>Không có dữ liệu</span>}
        </p>
      </li>
      <li>
        <p className='text-sm font-semibold'>Tên khoa</p>
        <p className='text-sm'>
          {props.data?.facultyCode ?? <span className='italic text-gray-500'>Không có dữ liệu</span>} -{' '}
          {props.data?.facultyName ?? <span className='italic text-gray-500'>Không có dữ liệu</span>}
        </p>
      </li>
      <li>
        <p className='text-sm font-semibold'>Tên bằng</p>
        <p className='text-sm'>{props.data?.name ?? <span className='italic text-gray-500'>Không có dữ liệu</span>}</p>
      </li>
      <li>
        <p className='text-sm font-semibold'>Loại bằng</p>
        <p className='text-sm'>
          {props.data?.certificateType ?? <span className='italic text-gray-500'>Không có dữ liệu</span>}
        </p>
      </li>
      <li>
        <p className='text-sm font-semibold'>Ngày cấp</p>
        <p className='text-sm'>{props.data?.date ?? <span className='italic text-gray-500'>Không có dữ liệu</span>}</p>
      </li>
      <li>
        <p className='text-sm font-semibold'>Số hiệu</p>
        <p className='text-sm'>
          {props.data?.serialNumber ?? <span className='italic text-gray-500'>Không có dữ liệu</span>}
        </p>
      </li>
      <li>
        <p className='text-sm font-semibold'>Số vào sổ gốc cấp văn bằng</p>
        <p className='text-sm'>{props.data?.regNo ?? <span className='italic text-gray-500'>Không có dữ liệu</span>}</p>
      </li>
      <li>
        <p className='text-sm font-semibold'>Trạng thái ký</p>
        <Badge variant={props.data?.signed ? 'default' : 'outline'}>{props.data?.signed ? 'Đã ký' : 'Chưa ký'}</Badge>
      </li>
    </ul>
  )
}

export default CertificateView
