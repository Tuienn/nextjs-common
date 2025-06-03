'use client'
import CustomFormItem from '@/components/common/ct-form-item'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import UseAdminStore from '@/stores/admin-store'
import { type CustomFormItem as CustomFormItemType } from '@/types/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  title: string
  formItems: Omit<CustomFormItemType, 'control'>[]
}

const Filter: React.FC<Props> = (props) => {
  const store = UseAdminStore()
  useEffect(() => {
    store.resetFilterSearch()
  }, [])

  const formSchema = z.object(
    props.formItems.reduce(
      (acc, obj) => {
        acc[obj.name] = z.any()
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
          acc[obj.name] = ''
          return acc
        },
        {} as Record<string, string>
      )
    }
  })

  const onSubmit = (data: any) => {
    store.setFilterSearch(data)
  }
  const handleReset = () => {
    form.reset()
    store.resetFilterSearch()
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            {props.title}
            <div className='flex flex-col items-center gap-2 sm:flex-row'>
              <Button variant='outline' onClick={handleReset}>
                Xóa bộ lọc
              </Button>
              <Button onClick={form.handleSubmit(onSubmit)}>Tìm kiếm</Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5'>
              {props.formItems.map((prop, index) => (
                <CustomFormItem {...prop} control={form.control} key={index} />
              ))}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default Filter
