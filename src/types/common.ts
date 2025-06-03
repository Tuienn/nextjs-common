import { type Dayjs } from 'dayjs'
import { HTMLInputTypeAttribute } from 'react'
import { Control } from 'react-hook-form'
import { z } from 'zod'

export interface AuthUser {
  id: string
  role: 'admin' | 'student' | 'lecturer'
}

export interface OptionType {
  value: string
  label: string
}

interface SelectGroup {
  label: string | undefined
  options: OptionType[]
}

export interface CustomFormItem {
  type: 'input' | 'select' | 'query_select' | 'search_select' | 'date'
  control: Control<any, any, any> | undefined
  name: string
  label?: string | ''
  placeholder?: string
  description?: string | undefined
  disabled?: boolean | false
  validator?: z.ZodType

  setting?: {
    input?: {
      type?: HTMLInputTypeAttribute | undefined
    }
    select?: {
      groups?: SelectGroup[]
    }
    querySelect?: {
      queryFn: (keyword: string) => Promise<any>
    }
    date?: {
      mode?: 'single' | 'range'
      min?: Dayjs
      max?: Dayjs
    }
  }
}

export interface Student {
  id: string
  studentCode: string
  fullName: string
  personalEmail: string
  email: string
  ethnicity: string
  gender: string
  major: string
  class: string
  course: string
  nationalId: string
  address: string
  placeOfBirth: string
  dateOfBirth: Dayjs | string
  phoneNumber: string
}

export interface StudentTableItem extends Omit<Student, 'ethnicity' | 'nationalId' | 'email' | 'personalEmail'> {}

export interface Class {
  id: string
  code: string
  course: string
  majorName: string
  majorCode: string
}
