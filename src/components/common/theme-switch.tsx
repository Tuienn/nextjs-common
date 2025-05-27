'use client'

import { useTheme } from 'next-themes'
import { Button } from '../ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()
  return (
    <Button variant='secondary' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'light' ? <SunIcon className='h-4 w-4' /> : <MoonIcon className='h-4 w-4' />}
    </Button>
  )
}

export default ThemeSwitch
