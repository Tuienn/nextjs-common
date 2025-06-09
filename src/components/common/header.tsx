import { Button } from '../ui/button'
import XrmSvg from '../../../public/assets/svg/xrm.svg'
import ThemeSwitch from './theme-switch'
import Image from 'next/image'
import SignOutButton from './signout-button'
import { LogIn, MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '../ui/navigation-menu'
import Link from 'next/link'

interface Props {
  role: 'student' | 'admin' | null
}

const educationAdminPages: { title: string; href: string }[] = [
  {
    title: 'Quản lý khoa',
    href: '/education-admin/faculty-management'
  },
  {
    title: 'Quản lý sinh viên',
    href: '/education-admin/student-management'
  },
  {
    title: 'Quản lý điểm',
    href: '/education-admin/score-management'
  },
  {
    title: 'Quản lý chứng chỉ',
    href: '/education-admin/certificate-management'
  }
]

const studentPages: { title: string; href: string }[] = [
  {
    title: 'Thông tin cá nhân',
    href: '/student/information'
  },
  {
    title: 'Kết quả học tập',
    href: '/student/score'
  },
  {
    title: 'Thông tin chứng chỉ',
    href: '/student/certificate'
  }
]

const Header: React.FC<Props> = (props) => {
  const navList = props.role === 'admin' ? educationAdminPages : studentPages
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
                <SheetHeader className='mb-4'>
                  <SheetTitle className='text-start'>Chức năng</SheetTitle>
                </SheetHeader>
                {navList.map((item) => (
                  <Link href={item.href} key={item.href}>
                    <Button variant={'link'} className='flex-start mb-2 block pr-0'>
                      {item.title}
                    </Button>
                  </Link>
                ))}
              </SheetContent>
            </Sheet>
            <div className='h-9 w-9'></div>
          </div>
        ) : null}

        <Link href='/'>
          {' '}
          <Image src={XrmSvg} alt='xrm' width={100} height={100} />
        </Link>

        {props.role !== null ? (
          <NavigationMenu className='hidden md:flex md:gap-2'>
            <NavigationMenuList>
              {navList.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={item.href}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        ) : null}

        <div className='flex items-center gap-2'>
          {props.role !== null ? (
            <SignOutButton />
          ) : (
            <Button>
              <Link href='/auth/sign-in'>Đăng nhập</Link>
            </Button>
          )}
          <ThemeSwitch />
        </div>
      </header>
    </div>
  )
}

export default Header
