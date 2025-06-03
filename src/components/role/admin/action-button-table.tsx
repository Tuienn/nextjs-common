'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import UseAdminStore from '@/stores/admin-store'
import { MoreHorizontal } from 'lucide-react'

interface Props {
  id: string
}

const ActionButtonTable: React.FC<Props> = (props) => {
  const { setId, setIdDelete } = UseAdminStore()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-36'>
        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Sao chép ID</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setId(props.id)}>Sửa</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-red-500 hover:!text-red-500'
            onClick={() => {
              setIdDelete(props.id)
            }}
          >
            Xóa
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionButtonTable
