import { Button } from '@/components/ui/button'
import { DownloadIcon, EyeIcon, PencilIcon } from 'lucide-react'

interface Props {
  id: string
  handleSetIdDetail: (id: string) => void
}

const CertificateActionButton: React.FC<Props> = (props) => {
  return (
    <div className='flex items-center gap-2'>
      <Button size={'icon'} onClick={() => props.handleSetIdDetail(props.id)}>
        <EyeIcon />
      </Button>

      <Button variant={'outline'} size={'icon'}>
        <DownloadIcon />
      </Button>
    </div>
  )
}

export default CertificateActionButton
