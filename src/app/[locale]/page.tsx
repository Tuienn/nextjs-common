import Header from '@/components/common/header'
import XrmSvg from '@/components/common/svg/XRM'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'
const HomePage = () => {
  const t = useTranslations('home')
  return (
    <main>
      <Header isAuthenticated={false} />
      <div className='container mt-6 flex flex-col items-center justify-center'>
        <div className='w-36 md:w-48'>
          <XrmSvg />
        </div>
        <h1 className='mt-3 text-center text-2xl font-semibold sm:text-4xl md:mt-6'>
          {t('title.solution')} <span className='text-blue-500'>{t('title.name')}</span> {t('title.application')}{' '}
          <span className='text-blue-500'>Blockchain</span>
        </h1>
        <p className='mt-3 text-center text-sm text-gray-500 sm:text-lg'>{t('title.description')}</p>
        <Card className='mt-6 w-full max-w-[600px] md:mt-10'>
          <CardHeader>
            <CardTitle className='px-3 text-center md:px-6'>
              <h2>{t('card.title')}</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className='px-3 md:px-6'>
            <div className='flex items-center gap-2'>
              <Input placeholder={t('card.placeholder')} />
              <Button>{t('card.button')}</Button>
            </div>
            <Separator className='my-6' />
            <Button variant='secondary' className='w-full'>
              {t('card.button_qr_code')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default HomePage
