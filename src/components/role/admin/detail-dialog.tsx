'use client'

import CustomFormItem from '@/components/common/ct-form-item'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { type CustomZodFormItem } from '@/types/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  children: CustomZodFormItem[]
  data: any
  mode: 'create' | 'update' | undefined
  handleSubmit: (data: any) => void
  handleClose: () => void
}

const DetailDialog: React.FC<Props> = (props) => {
  const formSchema = z.object(
    props.children.reduce(
      (acc, obj) => {
        acc[obj.name] = obj.validator || z.any()
        return acc
      },
      {} as Record<string, z.ZodType>
    )
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props.children.reduce(
      (acc, obj) => {
        acc[obj.name] = obj.defaultValue || ''
        return acc
      },
      {} as Record<string, any>
    )
  })

  useEffect(() => {
    if (props.mode === 'update' && props.data) {
      for (const key in props.data) {
        form.setValue(key, props.data[key])
      }
    } else if (props.mode === undefined) {
      form.reset()
    }
  }, [props.mode, props.data])

  return (
    <Dialog
      open={props.mode !== undefined}
      onOpenChange={(open) => {
        if (open === false) {
          props.handleClose()
        }
      }}
    >
      <DialogContent className='max-h-[80vh] overflow-y-scroll sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>{props.mode === 'create' ? 'Tạo mới dữ liệu' : 'Cập nhật dữ liệu'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(props.handleSubmit)} className='space-y-4'>
            {props.children.map((prop, index) => (
              <CustomFormItem {...prop} control={form.control} key={index} />
            ))}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline' type='button'>
                  Hủy
                </Button>
              </DialogClose>
              <Button type='submit'>{props.mode === 'create' ? 'Tạo mới' : 'Cập nhật'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default DetailDialog
