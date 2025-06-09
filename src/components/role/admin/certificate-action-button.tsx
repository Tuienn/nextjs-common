import { Button } from '@/components/ui/button'
import { DownloadIcon, EyeIcon, PencilIcon } from 'lucide-react'

interface Props {
  id: string
}

const CertificateActionButton: React.FC<Props> = (props) => {
  return (
    <div className='flex items-center gap-2'>
      <Button variant={'outline'} size={'icon'}>
        <PencilIcon />
      </Button>
      <Button size={'icon'}>
        <EyeIcon />
      </Button>

      <Button variant={'outline'} size={'icon'}>
        <DownloadIcon />
      </Button>
    </div>
  )
}

export default CertificateActionButton
