import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

const index = () => {
  const location = useLocation()
  const urlCurrent = location.pathname
  return (
    <div className='lg:flex lg:min-h-screen'>
      <div className='lg:w-1/4 bg-blue-900 px-5 py-10'>
        <h2 className='text-3xl font-black text-center text-white uppercase'>
          Validador De Derechos
        </h2>
        <div className='mt-10'>
          <Link
            to='/validator/consult'
            className={`${
              urlCurrent === '/validator/consult' ? 'text-blue-300' : 'text-white'
            } text-2xl block mt-2 hover:text-blue-300`}
          >
            Consultar derechos
          </Link>
          <Link
            to='/validator/detail'
            className={`${
              urlCurrent === '/validator/detail' ? 'text-blue-300' : 'text-white'
            } text-2xl block mt-2 hover:text-blue-300`}
          >
            Visualizar clientes
          </Link>
          <Link
            to='/validator/upload'
            className={`${
              urlCurrent === '/validator/upload'
                ? 'text-blue-300'
                : 'text-white'
            } text-2xl block mt-2 hover:text-blue-300`}
          >
            Cargar Excel
          </Link>
          {/* <Link
            to='/validator/cerrar'
            className={`${
              urlCurrent === '/validator/upload'
                ? 'text-blue-300'
                : 'text-white'
            } text-2xl block mt-2 hover:text-blue-300`}
          >
            Cerrar sesión
          </Link> */}
        </div>
      </div>
      <div className='lg:w-3/4 p-2 lg:p-10 scroll'>
        <Outlet />
      </div>
    </div>
  )
}

export default index
