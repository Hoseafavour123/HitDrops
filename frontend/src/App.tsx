import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { DarkThemeToggle, Flowbite } from 'flowbite-react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { useState } from 'react'

function App() {
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false)
  return (
    <Flowbite>
      <BrowserRouter>
        <div className='flex'>
          <Sidebar sidebarToggle={sidebarToggle} />
          <Dashboard sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        </div>

        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Flowbite>
  )
}

export default App
