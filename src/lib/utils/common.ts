import { format } from 'date-fns'

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export const clearFalsyValueObject = (obj: Record<string, any>) => {
  return Object.fromEntries(Object.entries(obj).filter((entry) => entry[1] !== null && entry[1] !== undefined))
}

export const queryString = (slashParams: (string | number)[], params?: any) => {
  const filteredParams = params ? clearFalsyValueObject(params) : null
  const queryString = filteredParams ? new URLSearchParams(filteredParams as Record<string, string>).toString() : null
  return `${slashParams.join('/')}${queryString ? '?' + queryString : ''}`
}

export const toastNoti = (type: 'success' | 'error', message?: string) => {
  return {
    title: 'Thông báo',
    description: message || (type === 'success' ? 'Thao tác thành công' : 'Thao tác thất bại'),
    variant: type === 'success' ? 'default' : ('destructive' as 'default' | 'destructive')
  }
}
