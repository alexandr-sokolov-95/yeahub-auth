import { Header } from '@/widgets/header/ui'
import { Outlet } from 'react-router'

export const DashboardLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
