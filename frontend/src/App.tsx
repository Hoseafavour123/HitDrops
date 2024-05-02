import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'
import SideBarNav from './components/SideBarNav'
import NavBar from './components/NavBar'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <div className="flex gap-4">
          <SideBarNav />
          <div className="ml-[11%] w-full">
            <NavBar />
          </div>
        </div>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
