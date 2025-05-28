import { useTranslations } from 'next-intl'
import { Button } from '../ui/button'
import XrmSvg from '@/assets/svg/xrm.svg'
import ThemeSwitch from './theme-switch'
import LanguageSwitch from './language-switch'
import Image from 'next/image'
import { Avatar } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'

interface Props {
  role: 'student' | 'admin' | 'lecturer' | null
}

const Header: React.FC<Props> = (props) => {
  const t = useTranslations('header')
  return (
    <div className='fixed top-0 z-10 h-16 w-full bg-primary-foreground shadow-lg'>
      <header className='container flex h-full items-center justify-between'>
        <Image src={XrmSvg} alt='xrm' width={100} height={100} />
        <div className='flex items-center gap-2'>
          {props.role !== null ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className='cursor-pointer bg-gray-400'>
                  <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>NT</span>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{t('avatar.settings')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t('avatar.profile')}</DropdownMenuItem>
                <DropdownMenuItem className='text-red-500 hover:!text-red-500'>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <span>{t('avatar.logout')}</span>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('avatar.logout_dialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('avatar.logout_dialog.description')}</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('avatar.logout_dialog.cancel')}</AlertDialogCancel>
                        <AlertDialogAction>{t('avatar.logout_dialog.confirm')}</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button>{t('login')}</Button>
          )}
          <ThemeSwitch />
          <LanguageSwitch />
        </div>
      </header>
    </div>
  )
}

export default Header
