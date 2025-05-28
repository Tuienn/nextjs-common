'use client'

import Image from 'next/image'
import ChartDarkEn from '@/assets/images/chart-dark-en.png'
import ChartDarkVi from '@/assets/images/chart-dark-vi.png'
import { useLocale } from 'next-intl'

const ChartHome = () => {
  const locale = useLocale()

  return (
    <div className='flex-1 overflow-hidden rounded-xl bg-white'>
      <Image
        src={locale === 'en' ? ChartDarkEn : ChartDarkVi}
        className='w-full rounded-xl border'
        alt='chart-dark-en'
        width={1200}
        height={1200}
      />
    </div>
  )
}

export default ChartHome
