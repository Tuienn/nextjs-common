import Header from '@/components/common/header'
import { DataProvider } from '@/components/providers/data-provider'

interface Props {
  children: React.ReactNode
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <DataProvider>
      <main>
        <Header role='admin' />
        <div className='container mt-16 py-6'>{children}</div>
      </main>
    </DataProvider>
  )
}

export default AdminLayout
