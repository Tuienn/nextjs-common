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
    const files = event.target.files
    if (!files || files.length === 0) return

    try {
      // Process each file individually
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('file', file)
        props.handleUpload(formData)
      }
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
      <input
        ref={fileInputRef}
        type='file'
        accept='.xlsx, .xls, .csv, .pdf'
        onChange={handleFileChange}
        className='hidden'
        multiple
      />
      <Button
        variant='outline'
        onClick={handleButtonClick}
        isLoading={props.loading}
        title='Có hỗ trợ tải nhiều file cùng lúc'
      >
        <UploadIcon />
        <span className='hidden sm:block'>Tải tệp lên</span>
      </Button>
    </>
  )
}

export default UploadButton
