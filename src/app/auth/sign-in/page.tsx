'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { bigint, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import CustomFormItem from '@/components/common/ct-form-item'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import XrmSvg from '@/assets/svg/xrm.svg'
import background from '@/assets/images/background.jpg'
import { signIn } from '@/lib/auth/auth'
import { useToast } from '@/hooks/use-toast'
import { validateEmail, validatePassword } from '@/lib/utils/validators'
import Link from 'next/link'
const formSchma = z.object({
  email: validateEmail,
  password: validatePassword
})

const AuthPage = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchma>>({
    resolver: zodResolver(formSchma),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = async (data: z.infer<typeof formSchma>) => {
    const res = await signIn(data)
    if (res === false) {
      toast({
        title: 'Lỗi',
        description: 'Email hoặc mật khẩu không chính xác',
        variant: 'destructive'
      })
    } else {
      toast({
        title: 'Thành công',
        description: 'Đăng nhập thành công'
      })
    }
  }

  return (
    <div className='relative bottom-0 left-0 right-0 top-0 h-screen'>
      <Image src={background} width={1500} height={1500} className='h-full w-full object-cover' alt='no-image' />
      <Dialog open>
        <DialogContent className='max-w-[450px] rounded-lg [&>button]:hidden'>
          <DialogHeader>
            <DialogTitle>
              <div>
                <Image src={XrmSvg} alt='xrm' width={150} height={150} className='mx-auto' />
              </div>
              Đăng nhập
            </DialogTitle>
            <DialogDescription>Chào mừng bạn quay trở lại</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
              <CustomFormItem
                type='input'
                control={form.control}
                name='email'
                label='Email'
                placeholder='Nhập email'
                setting={{ input: { type: 'email' } }}
              />
              <CustomFormItem
                type='input'
                control={form.control}
                name='password'
                label='Mật khẩu'
                placeholder='Nhập mật khẩu'
                setting={{ input: { type: 'password' } }}
              />
              <Button type='submit' className='w-full'>
                Đăng nhập
              </Button>
            </form>
          </Form>
          <div className='text-center text-sm'>
            Chưa có tài khoản?{' '}
            <Link className='underline underline-offset-4' href='/auth/sign-up'>
              Đăng ký
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AuthPage
