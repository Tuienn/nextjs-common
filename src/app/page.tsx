import Header from '@/components/common/header'
import XrmSvg from '@/assets/svg/xrm.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import NextSvg from '@/assets/svg/nextjs.svg'
import MongoDBSvg from '@/assets/svg/mongodb.svg'
import GolangSvg from '@/assets/svg/golang.svg'
import FabricSvg from '@/assets/svg/fabric.svg'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import Chart from '@/assets/images/chart.png'

const HomePage = () => {
  return (
    <main>
      <Header role={null} />
      <div className='container mt-24 flex flex-col items-center justify-center'>
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
            {/* <Separator className='my-6' />
            <Button variant='secondary' className='w-full'>
              Mở camera để quét QR code
            </Button> */}
          </CardContent>
        </Card>
      </div>
      <Separator className='my-6 md:my-10' />
      <div className='container'>
        <h2 className='mb-3 text-center'>Các công nghệ sử dụng</h2>

        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-4 lg:grid-cols-4'>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className='flex items-center gap-4'>
                  <Avatar>
                    <Image src={NextSvg} alt='nextjs' width={40} height={40} />
                    <AvatarFallback>N</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='mb-0'>NextJS</h3>
                    <Button variant={'link'} className='h-5 p-0 text-muted-foreground'>
                      <a href='https://nextjs.org/' target='_blank'>
                        Xem thêm
                      </a>
                    </Button>
                  </div>
                </div>
              </CardTitle>
              <CardContent className='p-0'>
                <ul>
                  <li className='mb-2'>
                    Next.js là framework dựa trên React, hỗ trợ cả render phía máy chủ (SSR) và tạo trang tĩnh (SSG),
                    giúp tăng tốc phát triển web.
                  </li>
                  <li>
                    Next.js cung cấp nhiều tính năng như routing, API routes, tối ưu hóa hình ảnh và hỗ trợ TypeScript,
                    giúp xây dựng ứng dụng web linh hoạt và hiệu suất cao.
                  </li>
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className='flex items-center gap-4'>
                  <Avatar>
                    <Image src={MongoDBSvg} alt='mongodb' width={40} height={40} />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='mb-0'>MongoDB</h3>
                    <Button variant={'link'} className='h-5 p-0 text-muted-foreground'>
                      <a href='https://www.mongodb.com/' target='_blank'>
                        Xem thêm
                      </a>
                    </Button>
                  </div>
                </div>
              </CardTitle>
              <CardContent className='p-0'>
                <ul>
                  <li className='mb-2'>
                    MongoDB là cơ sở dữ liệu NoSQL hướng tài liệu, lưu trữ dữ liệu dưới dạng JSON linh hoạt, hỗ trợ phát
                    triển nhanh và dễ dàng thay đổi.
                  </li>
                  <li>
                    MongoDB có khả năng mở rộng theo chiều ngang và truy vấn mạnh mẽ, phù hợp để xử lý các tập dữ liệu
                    lớn, phi cấu trúc.
                  </li>
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className='flex items-center gap-4'>
                  <Avatar>
                    <Image src={GolangSvg} alt='golang' width={40} height={40} />
                    <AvatarFallback>G</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='mb-0'>Golang</h3>
                    <Button variant={'link'} className='h-5 p-0 text-muted-foreground'>
                      <a href='https://go.dev/' target='_blank'>
                        Xem thêm
                      </a>
                    </Button>
                  </div>
                </div>
              </CardTitle>
              <CardContent className='p-0'>
                <ul>
                  <li className='mb-2'>
                    Go là ngôn ngữ lập trình biên dịch tĩnh do Google phát triển, nổi bật với sự đơn giản, xử lý đồng
                    thời và hiệu suất cao.
                  </li>
                  <li>
                    Go được ưa chuộng để xây dựng dịch vụ backend có khả năng mở rộng, ứng dụng cloud-native và hệ thống
                    phân tán.
                  </li>
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className='flex items-center gap-4'>
                  <Avatar>
                    <Image src={FabricSvg} alt='fabric' width={40} height={40} />
                    <AvatarFallback>F</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='mb-0'>Fabric</h3>
                    <Button variant={'link'} className='h-5 p-0 text-muted-foreground'>
                      <a href='https://github.com/hyperledger/fabric.git' target='_blank'>
                        Xem thêm
                      </a>
                    </Button>
                  </div>
                </div>
              </CardTitle>
              <CardContent className='p-0'>
                <ul>
                  <li className='mb-2'>
                    Hyperledger Fabric là framework blockchain viết bởi Go, cấp phép dành cho doanh nghiệp, với kiến
                    trúc mô-đun và cơ chế đồng thuận linh hoạt.
                  </li>
                  <li>
                    Nó hỗ trợ hợp đồng thông minh (chaincode) và cung cấp khả năng mở rộng, bảo mật và hiệu suất cao cho
                    các mạng kinh doanh phức tạp.
                  </li>
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
      <Separator className='my-6 md:my-10' />
      <div className='container'>
        <h2 className='mb-3 text-center'>Luồng ứng dụng</h2>
        <div className='flex flex-col gap-8 rounded-xl border p-6 lg:flex-row'>
          <div className='flex-1 overflow-hidden rounded-xl bg-white'>
            <Image src={Chart} className='w-full rounded-xl border' alt='chart-dark-vi' width={1200} height={1200} />
          </div>
          <div className='flex-1'>
            <ul className='list-outside list-decimal space-y-2'>
              <li>
                Người dùng truy cập frontend Next.js để tra cứu văn bằng minh bạch trực tiếp trên blockchain qua ví mềm
                mà không cần đăng nhập.
              </li>
              <li>
                Người dùng có tài khoản đăng nhập để quản lý và cập nhật thông tin đào tạo qua backend Go, với dữ liệu
                lưu tập trung trên MongoDB.
              </li>
              <li>
                Backend Go xử lý cấp phát văn bằng mới, ghi thông tin lên blockchain Fabric đảm bảo tính bất biến và xác
                thực.
              </li>
              <li>Cán bộ phòng đào tạo sử dụng hệ thống tập trung để quản lý hồ sơ và theo dõi trạng thái đào tạo.</li>

              <li>
                Backend tổng hợp dữ liệu từ MongoDB và blockchain để tạo báo cáo, phục vụ công tác quản lý và phân tích.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage
