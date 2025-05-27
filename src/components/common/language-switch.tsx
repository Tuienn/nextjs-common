'use client'

import { useRouter, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { Button } from '../ui/button'

const LanguageSwitch = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <Button variant='secondary' size='icon' onClick={() => switchLocale(locale === 'en' ? 'vi' : 'en')}>
      {locale === 'vi' ? 'VI' : 'EN'}
    </Button>
  )
}

export default LanguageSwitch
