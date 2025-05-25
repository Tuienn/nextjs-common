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

export const queryString = (slashParams: (string | number)[], params?: any) => {
  const filteredParams = params
    ? Object.fromEntries(Object.entries(params).filter((entry) => entry[1] !== null && entry[1] !== undefined))
    : null
  const queryString = filteredParams ? new URLSearchParams(filteredParams as Record<string, string>).toString() : null
  return `${slashParams.join('/')}${queryString ? '?' + queryString : ''}`
}
