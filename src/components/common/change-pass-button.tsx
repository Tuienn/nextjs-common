'use client'

import { RotateCcwKeyIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'
import { z } from 'zod'
import { validateNoEmpty } from '@/lib/utils/validators'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form } from '../ui/form'
import CustomFormItem from './ct-form-item'
import useSWRMutation from 'swr/mutation'
import { changePassword } from '@/lib/api/auth'
import { toast } from '@/hooks/use-toast'
import { toastNoti } from '@/lib/utils/common'

const formSchema = z.object({
  oldPassword: validateNoEmpty('Mật khẩu cũ'),
  newPassword: validateNoEmpty('Mật khẩu mới')
})

interface Props {
  className?: string
}

const ChangePassButton: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: ''
    }
  })

  const mutateChangePassword = useSWRMutation(
    'change-password',
    (_, { arg }: { arg: z.infer<typeof formSchema> }) => changePassword(arg.oldPassword, arg.newPassword),
    {
      onSuccess: () => {
        toast(toastNoti('success', 'Thay đổi mật khẩu thành công'))
        setOpen(false)
        form.reset()
      },
      onError: (error) => {
        toast(toastNoti('error', error.message || 'Thay đổi mật khẩu thất bại'))
      }
    }
  )

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    mutateChangePassword.trigger(data)
  }

  return (
    <>
      <Button variant={'secondary'} size={'icon'} onClick={() => setOpen(true)} className={props.className}>
        <RotateCcwKeyIcon />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thay đổi mật khẩu</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
              <CustomFormItem
                type='input'
                control={form.control}
                name='oldPassword'
                label='Mật khẩu cũ'
                placeholder='Nhập mật khẩu cũ'
                setting={{ input: { type: 'password' } }}
              />
              <CustomFormItem
                type='input'
                control={form.control}
                name='newPassword'
                label='Mật khẩu mới'
                placeholder='Nhập mật khẩu mới'
                setting={{ input: { type: 'password' } }}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={'outline'}>Hủy bỏ</Button>
                </DialogClose>
                <Button type='submit' isLoading={mutateChangePassword.isMutating}>
                  Cập nhật
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ChangePassButton
