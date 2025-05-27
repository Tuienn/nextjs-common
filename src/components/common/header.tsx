import { useTranslations } from 'next-intl'
import { Button } from '../ui/button'
import XrmSvg from './svg/XRM'
import ThemeSwitch from './theme-switch'
import LanguageSwitch from './language-switch'

interface Props {
  isAuthenticated: boolean
}

const Header: React.FC<Props> = (props) => {
  const t = useTranslations('home')
  return (
    <div className='h-16 bg-primary-foreground shadow-lg'>
      <header className='container flex h-full items-center justify-between'>
        <div className='h-full w-32'>
          <XrmSvg />
        </div>
        <div className='flex items-center gap-2'>
          <Button>{t('login')}</Button>
          <ThemeSwitch />
          <LanguageSwitch />
        </div>
      </header>
    </div>
  )
}

export default Header
