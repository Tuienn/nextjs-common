import { Button } from '../ui/button'
import XrmSvg from '@/assets/svg/xrm.svg'
import ThemeSwitch from './theme-switch'
import Image from 'next/image'
import SignOutButton from './signout-button'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '../ui/navigation-menu'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

interface Props {
  role: 'student' | 'admin' | 'lecturer' | null
}

const adminStudentManagement: { title: string; href: string; description: string }[] = [
  {
    title: 'Quản lý thông tin sinh viên',
    href: '/admin/student-management',
    description: 'Quản lý thông tin của sinh viên toàn trường.'
  },
  {
    title: 'Quản lý điểm sinh viên',
    href: '/admin/score-management',
    description: 'Quản lý điểm theo từng môn học và từng học kỳ.'
  },
  {
    title: 'Quản lý văn bằng, chứng chỉ',
    href: '/admin/certificate-management',
    description: 'Cấp phát, lưu trữ và xác thực các văn bằng, chứng chỉ.'
  }
]

const adminAcademicManagement: { title: string; href: string; description: string }[] = [
  {
    title: 'Quản lý khoa',
    href: '/admin/faculty-management',
    description: 'Quản lý các khoa trong trường.'
  },
  {
    title: 'Quản lý lớp học',
    href: '/admin/class-management',
    description: 'Quản lý các lớp học trong trường theo từng khóa.'
  },
  {
    title: 'Quản lý môn học',
    href: '/admin/subject-management',
    description: 'Quản lý danh mục môn học giảng dạy theo từng khóa.'
  },
  {
    title: 'Quản lý giảng viên',
    href: '/admin/lecturer-management',
    description: 'Quản lý các giảng viên trong trường.'
  }
]

const Header: React.FC<Props> = (props) => {
  const navList = props.role === 'admin' ? adminStudentManagement : adminAcademicManagement
  return (
    <div className='fixed top-0 z-10 h-16 w-full bg-primary-foreground shadow-lg'>
      <header className='container flex h-full items-center justify-between'>
        {props.role !== null ? (
          <div className='flex gap-2 md:hidden'>
            <Sheet>
              <SheetTrigger>
                <div className='rounded-md border p-1 hover:bg-accent'>
                  <MenuIcon />
                </div>
              </SheetTrigger>

              <SheetContent side={'left'}>
                <SheetHeader>
                  <SheetTitle className='text-start'>Chức năng</SheetTitle>
                </SheetHeader>
                <Accordion type='single' collapsible className='w-full'>
                  <AccordionItem value='1'>
                    <AccordionTrigger>Quản lý sinh viên</AccordionTrigger>
                    <AccordionContent>
                      <div className='flex flex-col gap-2'>
                        {navList.map((item) => (
                          <div className='cursor-pointer rounded-md px-4 py-2 hover:bg-accent' key={item.href}>
                            <Link href={item.href}>
                              <b className='mb-1 text-sm'>{item.title}</b>
                              <p className='text-sm text-muted-foreground'>{item.description}</p>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='2'>
                    <AccordionTrigger>Quản lý đào tạo</AccordionTrigger>
                    <AccordionContent>
                      <div className='flex flex-col gap-2'>
                        {navList.map((item) => (
                          <div className='cursor-pointer rounded-md px-4 py-2 hover:bg-accent' key={item.href}>
                            <Link href={item.href}>
                              <b className='mb-1 text-sm'>{item.title}</b>
                              <p className='text-sm text-muted-foreground'>{item.description}</p>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </SheetContent>
            </Sheet>
            <div className='h-9 w-9'></div>
          </div>
        ) : null}

        <Image src={XrmSvg} alt='xrm' width={100} height={100} />

        {props.role !== null ? (
          <NavigationMenu className='hidden md:flex md:gap-2'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Quản lý sinh viên</NavigationMenuTrigger>
                <NavigationMenuContent className='!w-[300px] p-2'>
                  {adminStudentManagement.map((item) => (
                    <div key={item.href} className='mb-2 rounded-md p-2 hover:bg-accent'>
                      <NavigationMenuLink asChild>
                        <Link href={item.href}>
                          <b className='mb-1 text-sm'>{item.title}</b>
                          <p className='text-sm text-muted-foreground'>{item.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Quản lý đào tạo</NavigationMenuTrigger>
                <NavigationMenuContent className='!w-[300px] p-2'>
                  {adminAcademicManagement.map((item) => (
                    <div key={item.href} className='mb-2 rounded-md p-2 hover:bg-accent'>
                      <NavigationMenuLink asChild>
                        <Link href={item.href}>
                          <b className='mb-1 text-sm'>{item.title}</b>
                          <p className='text-sm text-muted-foreground'>{item.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : null}

        <div className='flex items-center gap-2'>
          {props.role !== null ? <SignOutButton /> : <Button>Đăng nhập</Button>}
          <ThemeSwitch />
        </div>
      </header>
    </div>
  )
}

export default Header
