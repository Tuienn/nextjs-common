'use client'
import CertificateBlankButton from '@/components/common/certificate-blank-button'
import CertificateView from '@/components/common/certificate-view'
import PageHeader from '@/components/common/page-header'
import CommonPagination from '@/components/common/pagination'
import TableList from '@/components/role/education-admin/table-list'
import CreateVerifyCodeDialog from '@/components/role/student/create-verify-code'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTitle, DialogContent, DialogTrigger, DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { PAGE_SIZE } from '@/constants/common'
import { getCertificateDataStudent, getCertificateFile, getVerifyCodeList } from '@/lib/api/certificate'
import { CertificateType } from '@/types/common'
import { EyeIcon, PackagePlusIcon } from 'lucide-react'
import { useState } from 'react'
import useSWR from 'swr'

const StudentCertificatePage = () => {
  const [page, setPage] = useState(1)
  const queryVerifyCodeList = useSWR('verifyCode-list' + page, () => getVerifyCodeList({ page, page_size: PAGE_SIZE }))
  const [openCreateVerifyCode, setOpenCreateVerifyCode] = useState(false)
  const queryCertificateDataStudent = useSWR('certificate-data-student', getCertificateDataStudent)

  return (
    <>
      <PageHeader
        title='Thông tin chứng chỉ'
        extra={[
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'}>
                <EyeIcon /> <span className='hidden sm:block'>Xem chứng chỉ</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thông tin chứng chỉ</DialogTitle>
              </DialogHeader>
              <CertificateView data={queryCertificateDataStudent.data as CertificateType} />
              <DialogFooter>
                <CertificateBlankButton isIcon={false} action={() => getCertificateFile('my-file')} />
              </DialogFooter>
            </DialogContent>
          </Dialog>,
          <Button onClick={() => setOpenCreateVerifyCode(true)}>
            <PackagePlusIcon />
            <span className='hidden sm:block'>Tạo mã xác minh</span>
          </Button>
        ]}
      />

      <TableList
        children={[
          { header: 'Mã xác minh', value: 'verifyCode', className: 'min-w-[120px] font-semibold text-blue-500' },
          { header: 'Thời gian tạo', value: 'createdAt', className: 'min-w-[150px]' },
          { header: 'Hết hạn sau (phút)', value: 'expiredAfter', className: 'min-w-[100px]' },
          {
            header: 'Quyền hạn',
            value: 'permissionType',
            className: 'min-w-[150px]',
            render: (item) => (
              <div className='flex flex-wrap gap-2'>
                {item.permissionType.map((type: string, index: number) => (
                  <Badge variant={'outline'} key={index}>
                    {type === 'can_view_score'
                      ? 'Điểm'
                      : type === 'can_view_data'
                        ? 'Dữ liệu văn bằng'
                        : 'Tệp văn bằng'}
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
              <Badge variant={item.status ? 'default' : 'outline'}>{item.status ? 'Có hiệu lực' : 'Hết hạn'}</Badge>
            )
          }
        ]}
        data={queryVerifyCodeList.data?.data || []}
        page={page}
      />
      <CommonPagination page={page} totalPage={queryVerifyCodeList.data?.total_page || 0} handleChangePage={setPage} />
      <CreateVerifyCodeDialog
        open={openCreateVerifyCode}
        handleSetOpen={setOpenCreateVerifyCode}
        swrKey={'verifyCode-list' + page}
      />
    </>
  )
}

export default StudentCertificatePage
