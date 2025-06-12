import CertificateBlankButton from '@/components/common/certificate-blank-button'
import { Button } from '@/components/ui/button'
import { getCertificateFile } from '@/lib/api/certificate'
import { EyeIcon } from 'lucide-react'

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
      <CertificateBlankButton isIcon={true} action={() => getCertificateFile(props.id)} />
    </div>
  )
}

export default CertificateActionButton
