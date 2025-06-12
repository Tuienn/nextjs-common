'use client'

import ScoreView from '@/components/common/score-view'
import DetailDialog from '@/components/role/education-admin/detail-dialog'
import Filter from '@/components/role/education-admin/filter'
import TableActionButton from '@/components/role/education-admin/table-action-button'
import TableList from '@/components/role/education-admin/table-list'
import UploadButton from '@/components/role/education-admin/upload-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PlusIcon, SeparatorVertical } from 'lucide-react'
import { useCallback, useState } from 'react'
import { z } from 'zod'

const ScoreManagementPage = () => {
  const [idDetail, setIdDetail] = useState<string | undefined | null>(undefined)
  const [filter, setFilter] = useState<any>({})
  const handleDelete = (id: string) => {
    console.log(id)
  }
  const handleCloseDetailDialog = useCallback(() => {
    setIdDetail(undefined)
  }, [])
  const data = [
    {
      id: '1',
      name: 'Toán',
      credit: 3,
      score1: 8,
      score2: 9,
      examScore: 10,
      totalScore: 10,
      letterScore: 'A'
    },
    {
      id: '2',
      name: 'Vật lý',
      credit: 3,
      score1: 7,
      score2: 8,
      examScore: 8,
      totalScore: 9,
      letterScore: 'B'
    },
    {
      id: '3',
      name: 'Hóa học',
      credit: 3,
      score1: 9,
      score2: 9,
      examScore: 9,
      totalScore: 5,
      letterScore: 'A'
    },
    {
      id: '4',
      name: 'Sinh học',
      credit: 4,
      score1: 6,
      score2: 7,
      examScore: 7,
      totalScore: 8,
      letterScore: 'C'
    },
    {
      id: '5',
      name: 'Tin học',
      credit: 3,
      score1: 9,
      score2: 10,
      examScore: 9,
      totalScore: 4,
      letterScore: 'A'
    },
    {
      id: '6',
      name: 'Tiếng Anh',
      credit: 3,
      score1: 8,
      score2: 8,
      examScore: 8,
      totalScore: 2,
      letterScore: 'B'
    },
    {
      id: '7',
      name: 'Lịch sử',
      credit: 2,
      score1: 7,
      score2: 7,
      examScore: 8,
      totalScore: 3,
      letterScore: 'B'
    },
    {
      id: '8',
      name: 'Địa lý',
      credit: 2,
      score1: 8,
      score2: 8,
      examScore: 7,
      totalScore: 6,
      letterScore: 'B'
    },
    {
      id: '9',
      name: 'Giáo dục công dân',
      credit: 2,
      score1: 9,
      score2: 9,
      examScore: 8,
      totalScore: 10,
      letterScore: 'F'
    },
    {
      id: '10',
      name: 'Thể dục',
      credit: 2,
      score1: 10,
      score2: 10,
      examScore: 10,
      totalScore: 8.5,
      letterScore: 'A+'
    },
    {
      id: '11',
      name: 'Âm nhạc',
      credit: 2,
      score1: 9,
      score2: 9,
      examScore: 9,
      totalScore: 9,
      letterScore: 'D'
    }
  ]
  return (
    <>
      <div className='mb-4 flex items-center justify-between'>
        <h2>Quản lý điểm</h2>
        <div className='flex items-center gap-2'>
          <UploadButton handleUpload={() => {}} loading={false} />
          <Button onClick={() => setIdDetail(null)}>
            <PlusIcon />
            <span className='hidden sm:block'>Thêm điểm</span>
          </Button>
        </div>
      </div>
      <Filter
        children={[{ type: 'input', placeholder: 'Nhập mã sinh viên', name: 'code' }]}
        handleSetFilter={setFilter}
      />
      <Separator className='my-4' />
      <ScoreView passedSubject={0} failedSubject={0} gpa={0} studentName='Nguyễn Văn A' studentCode='CT060111' />
      <Separator className='my-4' />
      <TableList
        children={[
          { header: 'Tên môn học', value: 'name', className: 'min-w-[220px]' },
          { header: 'Số tín chỉ', value: 'credit', className: 'min-w-[80px]' },
          { header: 'Điểm thành phần 1', value: 'score1', className: 'min-w-[80px]' },
          { header: 'Điểm thành phần 2', value: 'score2', className: 'min-w-[80px]' },
          { header: 'Điểm thi', value: 'examScore', className: 'min-w-[80px]' },
          { header: 'Điểm tổng kết', value: 'totalScore', className: 'min-w-[80px]' },
          {
            header: 'Điểm chữ',
            value: 'letterScore',
            className: 'min-w-[80px]',
            render: (item) => {
              if (item.letterScore.includes('A')) {
                return <Badge className='bg-green-500'>{item.letterScore}</Badge>
              } else if (item.letterScore.includes('B')) {
                return <Badge className='bg-blue-500'>{item.letterScore}</Badge>
              } else if (item.letterScore.includes('C')) {
                return <Badge className='bg-yellow-500'>{item.letterScore}</Badge>
              } else {
                return <Badge className='bg-red-500'>{item.letterScore}</Badge>
              }
            }
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
        data={data}
      />
      <DetailDialog
        children={[
          {
            type: 'input',
            label: 'Tên môn học',
            name: 'name',
            placeholder: 'Nhập tên môn học',
            validator: z.string().nonempty({
              message: 'Tên môn học không được để trống'
            })
          },
          {
            type: 'input',
            label: 'Điểm thành phần 1',
            name: 'score1',
            placeholder: 'Nhập điểm từ 0 đến 10',
            setting: {
              input: {
                type: 'number'
              }
            },

            validator: z.number().min(0).max(10, {
              message: 'Điểm thành phần 1 phải nằm trong khoảng từ 0 đến 10'
            })
          },
          {
            type: 'input',
            label: 'Điểm thành phần 2',
            name: 'score2',
            placeholder: 'Nhập điểm từ 0 đến 10',
            setting: {
              input: {
                type: 'number'
              }
            },

            validator: z.number().min(0).max(10, {
              message: 'Điểm thành phần 2 phải nằm trong khoảng từ 0 đến 10'
            })
          },
          {
            type: 'input',
            label: 'Điểm thi',
            name: 'examScore',
            placeholder: 'Nhập điểm từ 0 đến 10',
            setting: {
              input: {
                type: 'number'
              }
            },
            validator: z.number().min(0).max(10, {
              message: 'Điểm thi phải nằm trong khoảng từ 0 đến 10'
            })
          }
        ]}
        data={{}}
        mode={idDetail ? 'update' : idDetail === undefined ? undefined : 'create'}
        handleSubmit={() => {}}
        handleClose={handleCloseDetailDialog}
      />
    </>
  )
}

export default ScoreManagementPage
