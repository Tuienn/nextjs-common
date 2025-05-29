import { HTMLInputTypeAttribute } from 'react'
import { Control, FieldValues } from 'react-hook-form'

export interface AuthUser {
  id: string
  role: 'admin' | 'student' | 'lecturer'
}

interface SelectOption {
  value: string
  label: string
}

interface SelectGroup {
  label: string | null
  options: SelectOption[]
}

export interface FormItemCustom {
  type: 'input' | 'select' | 'query_select' | 'search_select'
  control: Control<any, any, any> | undefined
  name: string
  label?: string | ''
  placeholder?: string
  description?: string | ''
  disabled?: boolean | false
  selectGroup?: SelectGroup[]
  inputType?: HTMLInputTypeAttribute | undefined
}
