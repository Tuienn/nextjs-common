import { type FormItemCustom } from '@/types/common'
import { Input } from '../ui/input'
import { FormDescription, FormMessage } from '../ui/form'
import { FormControl } from '../ui/form'
import { FormField, FormLabel } from '../ui/form'
import { FormItem } from '../ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'

const FormItemCustom: React.FC<FormItemCustom> = (props) => {
  switch (props.type) {
    case 'input':
      return (
        <FormField
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{props.label}</FormLabel>
              <FormControl>
                <Input placeholder={props.placeholder} {...field} disabled={props.disabled} type={props.inputType} />
              </FormControl>
              <FormDescription>{props.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case 'select':
      return (
        <FormField
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{props.label}</FormLabel>
              <Select disabled={props.disabled} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={props.placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {props.selectGroup?.map((group, index) => (
                    <SelectGroup key={index}>
                      {group.label && <SelectLabel>{group.label}</SelectLabel>}
                      {group.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>{props.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    default:
      return null
  }
}

export default FormItemCustom
