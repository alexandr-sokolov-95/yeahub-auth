import { Header } from '@/widgets/header/ui'
import { Outlet } from 'react-router'

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
