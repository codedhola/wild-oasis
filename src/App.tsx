import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins'
import Settings from './pages/Settings'
import Account from './pages/Account'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import Users from './pages/Users'
import AppLayout from './ui/AppLayout'
import GlobalStyles from './styles/GlobalStyles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 20 * 1000
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position='top-right' gutter={12} containerStyle={{ margin: "8px"}} toastOptions={{ 
        success: { 
          duration: 3000 
        }, 
        error: { 
          duration: 7000 
        }, 
        style: { 
        fontSize: "18px",
        maxWidth: "400x",
        padding: "16px 25px",
        background: "var(--color-grey-0)",
        color: "var(--color-grey-700"
      }}} />
    </QueryClientProvider>
  )
}

export default App
