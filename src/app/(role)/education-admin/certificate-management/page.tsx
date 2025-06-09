'use client'

import CommonPagination from '@/components/common/pagination'
import CertificateActionButton from '@/components/role/admin/certificate-action-button'
import Filter from '@/components/role/admin/filter'
import TableList from '@/components/role/admin/table-list'
import UploadButton from '@/components/role/admin/upload-button'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { useCallback } from 'react'
import useSWR from 'swr'

const CertificateManagementPage = () => {
  const [idDetail, setIdDetail] = useState<string | null | undefined>(undefined)

  const [filter, setFilter] = useState<any>({})
  const handleCloseDetailDialog = useCallback(() => {
    setIdDetail(undefined)
  }, [])

  const handleDelete = (id: string) => {
    console.log(id)
  }

  const data = [
    {
      code: 'CT060111',
      name: 'Nguyễn Văn A',
      typeCertificate: 'Giỏi',
      date: '2021-01-01'
    },
    {
      code: 'CT060112',
      name: 'Trần Thị B',
      typeCertificate: 'Xuất sắc',
      date: '2021-02-15'
    },
    {
      code: 'CT060113',
      name: 'Lê Văn C',
      typeCertificate: 'Khá',
      date: '2021-03-20'
    },
    {
      code: 'CT060114',
      name: 'Phạm Thị D',
      typeCertificate: 'Giỏi',
      date: '2021-04-10'
    },
    {
      code: 'CT060115',
      name: 'Hoàng Văn E',
      typeCertificate: 'Trung bình',
      date: '2021-05-05'
    },
    {
      code: 'CT060116',
      name: 'Ngô Thị F',
      typeCertificate: 'Xuất sắc',
      date: '2021-06-25'
    },
    {
      code: 'CT060117',
      name: 'Đỗ Văn G',
      typeCertificate: 'Khá',
      date: '2021-07-15'
    },
    {
      code: 'CT060118',
      name: 'Vũ Thị H',
      typeCertificate: 'Giỏi',
      date: '2021-08-30'
    },
    {
      code: 'CT060119',
      name: 'Bùi Văn I',
      typeCertificate: 'Trung bình',
      date: '2021-09-20'
    },
    {
      code: 'CT060120',
      name: 'Dương Thị K',
      typeCertificate: 'Xuất sắc',
      date: '2021-10-10'
    }
  ]

  return (
    <>
      <div className='mb-4 flex items-center justify-between'>
        <h2>Quản lý chứng chỉ</h2>
        <div className='flex items-center gap-2'>
          <UploadButton />
          <Button onClick={() => setIdDetail(null)}>
            <PlusIcon />
            <span className='hidden sm:block'>Cấp chứng chỉ</span>
          </Button>
        </div>
      </div>
      <Filter
        children={[
          { type: 'input', placeholder: 'Nhập mã sinh viên', name: 'code' },
          {
            type: 'select',
            placeholder: 'Chọn loại bằng',
            name: 'typeCertificate',
            setting: {
              select: {
                groups: [
                  {
                    label: undefined,
                    options: [
                      { value: '1', label: 'Xuất sắc' },
                      { value: '2', label: 'Giỏi' },
                      { value: '3', label: 'Khá' },
                      { value: '4', label: 'Trung bình' },
                      { value: '5', label: 'Yếu' }
                    ]
                  }
                ]
              }
            }
          },
          {
            type: 'input',
            placeholder: 'Từ ngày',
            name: 'fromDate',
            setting: {
              input: {
                type: 'date'
              }
            }
          },
          {
            type: 'input',
            placeholder: 'Đến ngày',
            name: 'toDate',
            setting: { input: { type: 'date' } }
          }
        ]}
        handleSetFilter={setFilter}
      />
      <TableList
        children={[
          { header: 'Mã SV', value: 'code', className: 'min-w-[80px] font-semibold text-blue-500' },
          { header: 'Họ và tên', value: 'name', className: 'min-w-[200px]' },
          { header: 'Loại bằng', value: 'typeCertificate', className: 'min-w-[100px]' },
          { header: 'Ngày cấp', value: 'date', className: 'min-w-[100px]' },
          {
            header: 'Hành động',
            value: 'action',

            render: (item) => <CertificateActionButton id={item.id} />
          }
        ]}
        data={data}
      />
      <CommonPagination />
    </>
  )
}

export default CertificateManagementPage
