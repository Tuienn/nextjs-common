import Header from '@/components/common/header'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header role='admin' />
      {children}
    </main>
  )
}

export default AdminLayout
