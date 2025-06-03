import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import ActionButtonTable from './action-button-table'

interface Props {
  headers: { className?: string; label: string; value: string }[]
  data: any[]
}

const TableList: React.FC<Props> = (props) => {
  return (
    <Table className='mt-4'>
      <TableHeader>
        <TableRow>
          {props.headers.map((header, index) => (
            <TableHead key={index} className={header.className}>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className='overflow-y-auto'>
        {props.data.map((item, index) => (
          <TableRow key={index}>
            {props.headers.map((header, index) => (
              <TableCell key={index}>
                <div className={`${header.className} truncate`} title={item[header.value]}>
                  {item[header.value]}
                </div>
              </TableCell>
            ))}
            <TableCell>
              <ActionButtonTable id={item.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableList
