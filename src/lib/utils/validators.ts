import { z } from 'zod'

export const validateString = z
  .string({
    message: 'Vui lòng nhập thông tin'
  })
  .trim()
  .nonempty({
    message: 'Vui lòng nhập thông tin'
  })

export const validateEmail = z
  .string()
  .trim()
  .nonempty({
    message: 'Vui lòng nhập email'
  })
  .email({
    message: 'Email không hợp lệ'
  })
export const validatePassword = z.string().trim().nonempty({
  message: 'Vui lòng nhập mật khẩu'
})

//fix number
export const validateTrainingPeriod = z
  .number({
    message: 'Vui lòng nhập số'
  })
  .min(1, {
    message: 'Vui lòng nhập thời gian đào tạo'
  })
  .max(5, {
    message: 'Thời gian đào tạo không được vượt quá 5 năm'
  })

export const validateAcademyEmail = z
  .string()
  .trim()
  .nonempty({
    message: 'Vui lòng nhập email'
  })
  .email({
    message: 'Email không hợp lệ'
  })
  .includes('@actvn.edu.vn', {
    message: 'Email không hợp lệ (Ví dụ: abc@actvn.edu.vn)'
  })

export const validateCredit = z
  .number({
    message: 'Vui lòng nhập số'
  })
  .min(1, {
    message: 'Vui lòng nhập số tín chỉ'
  })
