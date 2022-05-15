import Home from './Home'
import Login from './Login'
import ViewClients from './Client/ViewClients'
import DetailPatient from './Client/DetailPatient'
import UploadClient from './Client/UploadClient'
import ConsultClient from './Client/ConsultClient'
import { Routes, Route } from 'react-router-dom'

const AppRouter = () => {
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
