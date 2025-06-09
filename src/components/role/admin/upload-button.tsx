'use client'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'
import { UploadIcon } from 'lucide-react'

interface Props {
  handleUpload: (file: FormData) => void
  loading: boolean | false
}

const UploadButton: React.FC<Props> = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('file', file)
      props.handleUpload(formData)
    } catch (error: any) {
      console.error('Upload failed:', error)
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <input ref={fileInputRef} type='file' accept='.xlsx, .xls, .csv' onChange={handleFileChange} className='hidden' />
      <Button variant='outline' onClick={handleButtonClick} isLoading={props.loading}>
        <UploadIcon />
        <span className='hidden sm:block'>Tải tệp lên</span>
      </Button>
    </>
  )
}

export default UploadButton
