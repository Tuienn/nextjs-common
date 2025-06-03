'use client'
import CustomFormItem from '@/components/common/ct-form-item'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/hooks/use-toast'
import { toastNoti } from '@/lib/utils/common'
import { formatClass } from '@/lib/utils/format-api'
import UseAdminStore from '@/stores/admin-store'
import { type CustomFormItem as CustomFormItemType } from '@/types/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import { z } from 'zod'

interface Props {
  title: string
  formItems: Omit<CustomFormItemType, 'control'>[]
  handleCreate: (data: any) => void
  handleUpdate: (id: string, data: any) => void
  data: any
}

const DetailDialog: React.FC<Props> = (props) => {
  const { id, setId, filterSearch } = UseAdminStore()
  const isLoading = !!id && !props.data

  const formSchema = z.object(
    props.formItems.reduce(
      (acc, obj) => {
        acc[obj.name] = obj.validator || z.any()
        return acc
      },
      {} as Record<string, z.ZodType>
    )
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...props.formItems.reduce(
        (acc, obj) => {
          switch (obj.type) {
            case 'date':
              acc[obj.name] = null
              break
            case 'select':
            case 'search_select':
            case 'query_select':
              acc[obj.name] = ''
              break
            case 'input':
              acc[obj.name] = obj.setting?.input?.type === 'number' ? 0 : ''
              break
            default:
              acc[obj.name] = ''
          }
          return acc
        },
        {} as Record<string, any>
      )
    }
  })

  useEffect(() => {
    if (props.data && !!id) {
      for (const key in props.data) {
        form.setValue(key, props.data[key])
      }
    } else if (!id) {
      form.reset()
    }
  }, [props.data, id])

  const mutationCreate = useSWRMutation(
    'create',
    (_, { arg }: { arg: any }) => {
      return props.handleCreate(arg)
    },
    {
      onSuccess: () => {
        setId(undefined)
        mutate(filterSearch)
        toast(toastNoti('success'))
      },
      onError: (error: any) => {
        toast(toastNoti('error', error.error || error.message))
      }
    }
  )

  const mutationUpdate = useSWRMutation(id, (_, { arg }) => props.handleUpdate(id as string, arg), {
    onSuccess: () => {
      setId(undefined)
      mutate(filterSearch)
      toast(toastNoti('success'))
    },
    onError: (error) => {
      toast(toastNoti('error', error.error || error.message))
    }
  })

  const onSubmit = (data: any) => {
    if (id) {
      mutationUpdate.trigger(data)
    } else {
      mutationCreate.trigger(data)
    }
  }

  return (
    <Dialog open={id !== undefined} onOpenChange={() => setId(undefined)}>
      <DialogContent className='max-h-[80vh] max-w-[500px] overflow-y-scroll md:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className='space-y-2'>
            <Skeleton className='h-6' />
            <Skeleton className='h-6' />
            <Skeleton className='h-6' />
            <Skeleton className='h-6' />
            <Skeleton className='h-6' />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                {props.formItems.map((prop, index) => (
                  <CustomFormItem {...prop} control={form.control} key={index} />
                ))}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant='outline' type='button'>
                    Hủy
                  </Button>
                </DialogClose>
                <Button type='submit'>{id ? 'Cập nhật' : 'Tạo mới'}</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DetailDialog
