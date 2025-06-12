import { Loader2 } from 'lucide-react'

interface Props {
  url: string | undefined
  loading: boolean
}

const PDFView: React.FC<Props> = (props) => {
  if (!props.url && !props.loading)
    return (
      <div className='h-full w-full'>
        <p className='text-center text-red-500'>Không có file PDF</p>
      </div>
    )
  if (props.loading)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Loader2 className='h-4 w-4 animate-spin' />
        <p className='text-center text-sm text-gray-500'>Đang tải file PDF...</p>
      </div>
    )
  return <iframe src={props.url} className='h-full w-full' />
}

export default PDFView
