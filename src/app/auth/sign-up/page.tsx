'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import CustomFormItem from '@/components/common/ct-form-item'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import XrmSvg from '@/assets/svg/xrm.svg'
import background from '@/assets/images/background.jpg'
import { signIn } from '@/lib/auth/auth'
import { useToast } from '@/hooks/use-toast'
import { validateEmail, validatePassword } from '@/lib/utils/validators'
import Link from 'next/link'
import { InputOTPGroup } from '@/components/ui/input-otp'
import { InputOTPSlot } from '@/components/ui/input-otp'
import { InputOTP } from '@/components/ui/input-otp'
import { useState } from 'react'
const formPersonalEmailSchma = z.object({
  email: validateEmail,
  password: validatePassword,

  otp: z
    .string()
    .trim()
    .nonempty({
      message: 'Vui lòng nhập mã OTP'
    })
    .min(6, {
      message: 'Mã OTP phải có 6 ký tự'
    })
})

const formMicrosoftEmailSchma = z.object({
  microsoft_email: validateEmail,
  otp: z.string().trim().nonempty({
    message: 'Vui lòng nhập mã OTP'
  })
})
const AuthPage = () => {
  const { toast } = useToast()
  const [isOTPSended, setIsOTPSended] = useState(false)
  const formPersonalEmail = useForm<z.infer<typeof formPersonalEmailSchma>>({
    resolver: zodResolver(formPersonalEmailSchma),
    defaultValues: {
      email: '',
      password: '',

      otp: ''
    }
  })
  const formMicrosoftEmail = useForm<z.infer<typeof formMicrosoftEmailSchma>>({
    resolver: zodResolver(formMicrosoftEmailSchma),
    defaultValues: {
      microsoft_email: '',
      otp: ''
    }
  })

  const handleSubmit = async (data: z.infer<typeof formPersonalEmailSchma>) => {}

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
              Đăng ký
            </DialogTitle>
            <DialogDescription>Chào mừng bạn đến với hệ thống quản lý đào tạo</DialogDescription>
          </DialogHeader>
          <Form {...formMicrosoftEmail}>
            <form
              onSubmit={formMicrosoftEmail.handleSubmit(() => {})}
              className={`${!isOTPSended ? 'block' : 'hidden'} space-y-4`}
            >
              <CustomFormItem
                type='input'
                control={formMicrosoftEmail.control}
                name='microsoft_email'
                label='Email microsoft'
                placeholder='Nhập email microsoft'
                setting={{ input: { type: 'email' } }}
                description='Email microsoft được hệ thống sử dụng để xác thực'
              />
              <Button className='w-full' type='submit' onClick={() => setIsOTPSended(!isOTPSended)}>
                Gửi mã OTP
              </Button>
            </form>
          </Form>
          <Form {...formPersonalEmail}>
            <form
              onSubmit={formPersonalEmail.handleSubmit(handleSubmit)}
              className={`${isOTPSended ? 'block' : 'hidden'} space-y-4`}
            >
              <FormField
                control={formPersonalEmail.control}
                name='otp'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã OTP</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Mã OTP được gửi đến email <b>{formMicrosoftEmail.getValues('microsoft_email')}</b>
                    </FormDescription>
                    <FormMessage className='!mt-0' />
                  </FormItem>
                )}
              />
              <CustomFormItem
                type='input'
                control={formPersonalEmail.control}
                name='email'
                label='Email'
                placeholder='Nhập email'
                setting={{ input: { type: 'email' } }}
              />
              <CustomFormItem
                type='input'
                control={formPersonalEmail.control}
                name='password'
                label='Mật khẩu'
                placeholder='Nhập mật khẩu'
                setting={{ input: { type: 'password' } }}
              />
              <Button variant={'outline'} className='w-full' onClick={() => setIsOTPSended(!isOTPSended)}>
                Gửi lại mã OTP
              </Button>
              <Button type='submit' className={`w-full ${!isOTPSended ? 'hidden' : 'block'}`}>
                Đăng ký
              </Button>
            </form>
          </Form>

          <div className='text-center text-sm'>
            Đã có tài khoản?{' '}
            <Link className='underline underline-offset-4' href='/auth/sign-in'>
              Đăng nhập
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AuthPage
