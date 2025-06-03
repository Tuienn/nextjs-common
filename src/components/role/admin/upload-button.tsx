'use client'

import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import apiService from '@/lib/api/root'
import UseAdminStore from '@/stores/admin-store'
import { toast } from '@/hooks/use-toast'
import { mutate } from 'swr'

interface Props {
  api: string
}

const UploadButton: React.FC<Props> = ({ api }) => {
  const { filterSearch } = UseAdminStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await apiService('POST', api, formData, true)

      console.log('Upload successful:', response)
      mutate(filterSearch)
      toast({
        title: 'Thông báo',
        description: 'Tải file lên thành công'
      })
    } catch (error: any) {
      console.error('Upload failed:', error)
      toast({
        title: 'Thông báo',
        description: error.message || error.error || 'Tải file lên thất bại'
      })
    } finally {
      setIsUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        accept='.xlsx, .xls, .csv'
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button variant='outline' onClick={handleButtonClick} disabled={isUploading}>
        {isUploading ? 'Đang tải lên...' : 'Tải file lên'}
      </Button>
    </>
  )
}

export default UploadButton
