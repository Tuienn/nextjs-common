import Header from '@/components/common/header'
import XrmSvg from '../../public/assets/svg/xrm.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { getSession } from '@/lib/auth/session'
const HomePage = async () => {
  const session = await getSession()

  return (
    <main>
      <Header role={session?.role ? (session.role as 'admin' | 'student') : null} />
      <div className='container mt-16 flex flex-col items-center justify-center pt-8'>
        <Image src={XrmSvg} alt='xrm' width={200} height={100} />
        <h1 className='mt-3 text-center text-2xl font-semibold sm:text-4xl md:mt-6'>
          Giải pháp <span className='text-blue-500'>quản lý văn bằng chứng chỉ </span> ứng dụng{' '}
          <span className='text-blue-500'>Blockchain</span>
        </h1>
        <p className='mt-3 text-center text-sm text-muted-foreground sm:text-lg'>
          Dự án Web3 được xây dựng trên nền tảng Blockchain đảm bảo tính minh bạch cho văn bằng chứng chỉ
        </p>
        <Card className='mt-6 w-full max-w-[600px] md:mt-10'>
          <CardHeader>
            <CardTitle className='px-3 text-center md:px-6'>
              <h3>Tìm kiếm văn bằng chứng chỉ</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className='px-3 md:px-6'>
            <div className='flex items-center gap-2'>
              <Input placeholder='Nhập số chứng chỉ' />
              <Button>Xác thực</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default HomePage
