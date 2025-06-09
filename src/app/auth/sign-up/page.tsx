'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import CustomFormItem from '@/components/common/ct-form-item'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import XrmSvg from '../../../../public/assets/svg/xrm.svg'
import background from '../../../../public/assets/images/background.jpg'
import { useToast } from '@/hooks/use-toast'
import { validateEmail, validatePassword } from '@/lib/utils/validators'
import Link from 'next/link'
import { InputOTPGroup, InputOTPSeparator } from '@/components/ui/input-otp'
import { InputOTPSlot } from '@/components/ui/input-otp'
import { InputOTP } from '@/components/ui/input-otp'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import useSWRMutation from 'swr/mutation'
import { registerAccount, sendOTP, verifyOTP } from '@/lib/api/auth'
import { toastNoti } from '@/lib/utils/common'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { signIn } from '@/lib/auth/auth'
import { useRouter } from 'next/navigation'
const formPersonalEmailSchma = z.object({
  email: validateEmail,
  password: validatePassword
})

const AuthPage = () => {
  const { toast } = useToast()
  const [isOTPSended, setIsOTPSended] = useState(false)
  const [isOTPVerified, setIsOTPVerified] = useState(false)
  const formPersonalEmail = useForm<z.infer<typeof formPersonalEmailSchma>>({
    resolver: zodResolver(formPersonalEmailSchma),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const router = useRouter()
  const [inputEmail, setInputEmail] = useState('')
  const [inputOTP, setInputOTP] = useState('')
  const [idUserAfterVerifyOTP, setIdUserAfterVerifyOTP] = useState('')
  const mutateSendOTP = useSWRMutation('/auth/request-otp', () => sendOTP(inputEmail), {
    onSuccess: () => {
      toast(toastNoti('success', `Mã OTP đã được gửi đến email ${inputEmail}`))
      setIsOTPSended(true)
    },
    onError: (error) => {
      toast(toastNoti('error', error.message || error.error))
    }
  })

  const mutateVerifyOTP = useSWRMutation('/auth/verify-otp', () => verifyOTP(inputEmail, inputOTP), {
    onSuccess: (data) => {
      toast(toastNoti('success', 'Xác thực thành công'))
      setIsOTPVerified(true)
      setIdUserAfterVerifyOTP(data.user_id)
    },
    onError: (error) => {
      toast(toastNoti('error', error.message || error.error))
    }
  })

  const mutateRegisterAccount = useSWRMutation(
    '/auth/register',
    (_, { arg }: { arg: any }) => registerAccount(arg.email, arg.password, idUserAfterVerifyOTP),
    {
      onSuccess: () => {
        toast(toastNoti('success', 'Đăng ký tài khoản thành công'))
        signIn({
          email: formPersonalEmail.getValues('email'),
          password: formPersonalEmail.getValues('password')
        })
        router.refresh()
      },
      onError: (error) => {
        toast(toastNoti('error', error.message || error.error))
      }
    }
  )

  const handleSubmit = async (data: z.infer<typeof formPersonalEmailSchma>) => {
    mutateRegisterAccount.trigger({
      email: data.email,
      password: data.password
    })
  }

  return (
    <div className='relative bottom-0 left-0 right-0 top-0 h-screen'>
      <Image src={background} width={1500} height={1500} className='h-full w-full object-cover' alt='no-image' />
      <Dialog open>
        <DialogContent className='rounded-lg sm:max-w-[450px] [&>button]:hidden'>
          <DialogHeader>
            <DialogTitle>
              <div>
                <Image src={XrmSvg} alt='xrm' width={150} height={150} className='mx-auto' />
              </div>
              Đăng ký
            </DialogTitle>
            <DialogDescription>Chào mừng bạn đến với hệ thống quản lý đào tạo</DialogDescription>
          </DialogHeader>

          <div className={`${isOTPSended ? 'hidden' : 'block'}`}>
            <div>
              <Label>Email mircosoft</Label>
              <Input
                className='mt-2'
                type='email'
                placeholder='VD: CT060111@actvn.edu.vn'
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
              <p className='mt-2 text-sm text-gray-500'>Email microsoft được hệ thống sử dụng để xác thực</p>
              <Button
                className='mt-4 w-full'
                onClick={() => mutateSendOTP.trigger()}
                disabled={!inputEmail.includes('edu.vn')}
                isLoading={mutateSendOTP.isMutating}
              >
                Gửi mã OTP
              </Button>
            </div>
          </div>
          <div className={`${isOTPSended ? 'block' : 'hidden'} ${isOTPVerified ? 'hidden' : 'block'}`}>
            <Label>Mã OTP</Label>
            <div className='mb-2' />
            <InputOTP maxLength={6} value={inputOTP} onChange={(e) => setInputOTP(e)} pattern={REGEXP_ONLY_DIGITS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className='mt-2 text-sm text-gray-500'>
              Mã OTP được gửi đến email <b>{inputEmail}</b>
            </p>
            <Button
              className='mt-4 w-full'
              onClick={() => mutateVerifyOTP.trigger()}
              disabled={inputOTP.length !== 6}
              isLoading={mutateVerifyOTP.isMutating}
            >
              Xác thực
            </Button>
          </div>

          {/* Form email cá nhân */}
          <Form {...formPersonalEmail}>
            <form
              onSubmit={formPersonalEmail.handleSubmit(handleSubmit)}
              className={`${isOTPVerified && isOTPSended ? 'block' : 'hidden'} space-y-4`}
            >
              <CustomFormItem
                type='input'
                control={formPersonalEmail.control}
                name='email'
                label='Email'
                placeholder='VD: abc@gmail.com'
                setting={{ input: { type: 'email' } }}
              />
              <CustomFormItem
                type='input'
                control={formPersonalEmail.control}
                name='password'
                label='Mật khẩu'
                placeholder='VD: abc123'
                setting={{ input: { type: 'password' } }}
              />
              <Button
                variant={'outline'}
                className='w-full'
                onClick={() => {
                  setIsOTPSended(false)
                  setIsOTPVerified(false)
                }}
                type='button'
              >
                Gửi lại mã OTP
              </Button>
              <Button type='submit' className='w-full'>
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
