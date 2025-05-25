'use client'

import { useTranslations } from 'next-intl'
import { UseCounterStore } from '@/stores/hooks/counter-store'
const HomePage = () => {
  const t = useTranslations('home')
  const count = UseCounterStore((state) => state.count)
  const increment = UseCounterStore((state) => state.increment)
  const decrement = UseCounterStore((state) => state.decrement)

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('welcome')}</p>
      <p>{t('description')}</p>
      <p>{t('about.title')}</p>
      <p>{t('name', { name: 'John' })}</p>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}
export default HomePage
