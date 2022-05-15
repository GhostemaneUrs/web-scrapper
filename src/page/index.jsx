import Home from './Home'
import Login from './Login'
import ViewClient from './Client/ViewClient'
import UploadClient from './Client/UploadClient'
import ConsultClient from './Client/ConsultClient'
import { Routes, Route } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/validator' element={<Home />}>
        <Route index element={<ConsultClient />} />
        <Route path='detail' element={<ViewClient />} />
        <Route path='upload' element={<UploadClient />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
