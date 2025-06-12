import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction
} from '@/components/ui/alert-dialog'

import { TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'

interface Props {
  id: string
  handleDelete: (id: string) => void
  handleSetIdDetail: (id: string) => void
}

const TableActionButton: React.FC<Props> = (props) => {
  return (
    <div>
      <Button variant='outline' size='icon' className='mr-2' onClick={() => props.handleSetIdDetail(props.id)}>
        <PencilIcon />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive' size='icon'>
            <TrashIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa dữ liệu</AlertDialogTitle>
            <AlertDialogDescription>
              Dữ liệu có ID <b>{props.id}</b> sẽ bị xóa khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction onClick={() => props.handleDelete(props.id)}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default TableActionButton
