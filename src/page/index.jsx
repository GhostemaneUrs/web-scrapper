import Home from './Home'
import Login from './Login'
import ViewClients from './Client/ViewClients'
import DetailPatient from './Client/DetailPatient'
import UploadClient from './Client/UploadClient'
import ConsultClient from './Client/ConsultClient'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const AppRouter = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const loggedOutRoutes = ['/login']
  const urlCurrent = location.pathname
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    const { pathname } = location
    if (!user) {
      const redirect = loggedOutRoutes.every(
        route => !pathname.startsWith(route)
      )
      if (redirect && pathname !== '/login') navigate('/login')
    } else {
      const redirect = loggedOutRoutes.some(route => pathname.startsWith(route))
      if (redirect || pathname === '/') navigate('/login')
    }
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/validator' element={<Home />}>
        <Route index element={<ConsultClient />} />
        <Route path='view' element={<ViewClients />} />
        <Route path='detail' element={<DetailPatient />} />
        <Route path='upload' element={<UploadClient />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
