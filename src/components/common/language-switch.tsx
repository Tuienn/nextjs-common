'use client'

import { useRouter, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

const LanguageSwitch = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className='flex gap-2'>
      <button
        className={`rounded px-3 py-1 ${locale === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => switchLocale('en')}
      >
        English
      </button>
      <button
        className={`rounded px-3 py-1 ${locale === 'vi' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => switchLocale('vi')}
      >
        Tiếng Việt
      </button>
    </div>
  )
}

export default LanguageSwitch
