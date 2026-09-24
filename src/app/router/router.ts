import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { createBrowserRouter } from 'react-router'
import { RequireAuth, RequireGuest } from './guards'
import { MainLayout } from '@/widgets/main-layout/ui'
import { Dashboard } from '@/pages/Dashboard'
import { Posts } from '@/pages/Posts/ui/Posts'
import { DashboardLayout } from '@/widgets/dashboard-layout/ui'
import { AuthLayout } from '@/widgets/auth-layout/ui'

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    path: '/',
    children: [
      {
        index: true,
        Component: Posts,
      },
    ],
  },
  {
    Component: RequireAuth,
    children: [
      {
        Component: DashboardLayout,
        path: 'dashboard',
        children: [{ index: true, Component: Dashboard }],
      },
    ],
  },
  {
    Component: RequireGuest,
    children: [
      {
        Component: AuthLayout,
        children: [
          {
            path: 'login',
            Component: Login,
          },
          { path: 'register', Component: Register },
        ],
      },
    ],
  },
])
