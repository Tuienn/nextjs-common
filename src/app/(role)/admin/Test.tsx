'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FormItemCustom from '@/components/common/form-item-ct'

const formSchema = z.object({
  username: z.string(),
  select: z.string()
})

export const Test = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      select: ''
    }
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormItemCustom
          label='Username'
          type='input'
          placeholder='Username'
          control={form.control}
          name='username'
          inputType='email'
          disabled={true}
        />
        <div className='w-48'>
          <FormItemCustom
            label='Select'
            type='select'
            control={form.control}
            description='Select a value'
            placeholder='Select'
            name='select'
            selectGroup={[
              {
                label: undefined,
                options: [
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' }
                ]
              }
            ]}
          />
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export default Test
