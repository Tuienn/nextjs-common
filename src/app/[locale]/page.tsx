import Header from '@/components/common/header'
import XrmSvg from '@/assets/svg/xrm.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import NextSvg from '@/assets/svg/nextjs.svg'
import MongoDBSvg from '@/assets/svg/mongodb.svg'
import GolangSvg from '@/assets/svg/golang.svg'
import FabricSvg from '@/assets/svg/fabric.svg'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import ChartHome from '@/components/common/chart-home'
const HomePage = () => {
  const t = useTranslations('home')
  return (
    <main>
      <Header role={null} />
      <div className='container mt-24 flex flex-col items-center justify-center'>
        <Image src={XrmSvg} alt='xrm' width={200} height={100} />
        <h1 className='mt-3 text-center text-2xl font-semibold sm:text-4xl md:mt-6'>
          {t('title.solution')} <span className='text-blue-500'>{t('title.name')}</span> {t('title.application')}{' '}
          <span className='text-blue-500'>Blockchain</span>
        </h1>
        <p className='mt-3 text-center text-sm text-gray-500 sm:text-lg'>{t('title.description')}</p>
        <Card className='mt-6 w-full max-w-[600px] md:mt-10'>
          <CardHeader>
            <CardTitle className='px-3 text-center md:px-6'>
              <h3>{t('card.title')}</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className='px-3 md:px-6'>
            <div className='flex items-center gap-2'>
              <Input placeholder={t('card.placeholder')} />
              <Button>{t('card.button')}</Button>
            </div>
            {/* <Separator className='my-6' />
            <Button variant='secondary' className='w-full'>
              {t('card.button_qr_code')}
            </Button> */}
          </CardContent>
        </Card>
      </div>
      <Separator className='my-6 md:my-10' />
      <div className='container'>
        <h2 className='mb-3 text-center'>{t('technology.title')}</h2>

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
                    <Button variant={'link'} className='h-5 p-0 text-gray-500'>
                      <a href='https://nextjs.org/' target='_blank'>
                        {t('technology.view_more')}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardTitle>
              <CardContent className='p-0'>
                <ul>
                  <li className='mb-2'>{t('technology.nextjs.descryption_1')}</li>
                  <li>{t('technology.nextjs.descryption_2')}</li>
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
                    <Button variant={'link'} className='h-5 p-0 text-gray-500'>
                      <a href='https://www.mongodb.com/' target='_blank'>
                        {t('technology.view_more')}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardTitle>
              <CardContent className='p-0'>
                <ul>
                  <li className='mb-2'>{t('technology.mongodb.descryption_1')}</li>
                  <li>{t('technology.mongodb.descryption_2')}</li>
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
                    <Button variant={'link'} className='h-5 p-0 text-gray-500'>
                      <a href='https://go.dev/' target='_blank'>
                        {t('technology.view_more')}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardTitle>
              <CardContent className='p-0'>
                <ul>
                  <li className='mb-2'>{t('technology.golang.descryption_1')}</li>
                  <li>{t('technology.golang.descryption_2')}</li>
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
                    <Button variant={'link'} className='h-5 p-0 text-gray-500'>
                      <a href='https://github.com/hyperledger/fabric.git' target='_blank'>
                        {t('technology.view_more')}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardTitle>
              <CardContent className='p-0'>
                <ul>
                  <li className='mb-2'>{t('technology.fabric.descryption_1')}</li>
                  <li>{t('technology.fabric.descryption_2')}</li>
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
      <Separator className='my-6 md:my-10' />
      <div className='container'>
        <h2 className='mb-3 text-center'>{t('appilcation.title')}</h2>
        <div className='flex flex-col gap-8 rounded-xl border p-6 lg:flex-row'>
          <ChartHome />
          <div className='flex-1'>
            <ul className='list-inside list-decimal space-y-2'>
              <li>
                <span className='font-semibold'>{t('appilcation.title_1')}</span>
                <p className='ml-5'>{t('appilcation.descryption_1')}</p>
              </li>
              <li>
                <span className='font-semibold'>{t('appilcation.title_2')}</span>
                <p className='ml-5'>{t('appilcation.descryption_2')}</p>
              </li>
              <li>
                <span className='font-semibold'>{t('appilcation.title_3')}</span>
                <p className='ml-5'>{t('appilcation.descryption_3')}</p>
              </li>
              <li>
                <span className='font-semibold'>{t('appilcation.title_4')}</span>
                <p className='ml-5'>{t('appilcation.descryption_4')}</p>
              </li>
              <li>
                <span className='font-semibold'>{t('appilcation.title_5')}</span>
                <p className='ml-5'>{t('appilcation.descryption_5')}</p>
              </li>
              <li>
                <span className='font-semibold'>{t('appilcation.title_6')}</span>
                <p className='ml-5'>{t('appilcation.descryption_6')}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage
