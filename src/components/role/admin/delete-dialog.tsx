'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { toast } from '@/hooks/use-toast'
import { toastNoti } from '@/lib/utils/common'
import UseAdminStore from '@/stores/admin-store'
import { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'

interface Props {
  handleDelete: (id: string) => Promise<void>
}

const DeleteDialog: React.FC<Props> = (props) => {
  const { idDelete, setIdDelete, filterSearch } = UseAdminStore()
  const mutationDelete = useSWRMutation(idDelete, () => props.handleDelete(idDelete as string), {
    onSuccess: () => {
      mutate(filterSearch)
      toast(toastNoti('success'))
    },
    onError: (error) => {
      toast(toastNoti('error', error.error))
    }
  })

  return (
    <AlertDialog open={!!idDelete} onOpenChange={() => setIdDelete(undefined)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa không?</AlertDialogTitle>
          <AlertDialogDescription>Thao tác này sẽ xóa dữ liệu vĩnh viễn</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutationDelete.trigger()}>Xóa</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog
