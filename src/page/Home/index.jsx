import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { RiFileExcel2Line } from 'react-icons/ri'
import {
  AiOutlineFileSearch,
  AiOutlineFundView,
  AiOutlinePoweroff,
} from 'react-icons/ai'

const index = () => {
  const location = useLocation()
  const urlCurrent = location.pathname
  return (
    <>
      <div className='flex'>
        <div className='w-[3.8rem] bg-blue-900 px-4 py-10 overflow-hidden hover:w-[21rem] h-screen fixed ease-out duration-300 flex'>
          <div className='flex flex-col'>
            <div className='mb-7'>
              <Link
                to='/validator'
                className={`${
                  urlCurrent === '/validator' ? 'text-blue-300' : 'text-white'
                } text-2xl hover:text-blue-500 flex gap-4 min-w-[21rem]`}
              >
                <AiOutlineFileSearch size={'2rem'} /> Consultar
              </Link>
            </div>
            {/* <div className='mb-7'>
              <Link
                to='/validator/view'
                className={`${
                  urlCurrent === '/validator/view'
                    ? 'text-blue-300'
                    : 'text-white'
                } text-2xl hover:text-blue-300 flex gap-4 min-w-[21rem]`}
              >
                <AiOutlineFundView size={'2rem'} /> Visualizar
              </Link>
            </div> */}
            <div>
              <Link
                to='/validator/upload'
                className={`${
                  urlCurrent === '/validator/upload'
                    ? 'text-blue-300'
                    : 'text-white'
                } text-2xl hover:text-blue-300 flex gap-4 min-w-[21rem]`}
              >
                <RiFileExcel2Line size={'2rem'} /> Cargar
              </Link>
            </div>
            <div className='mt-auto'>
              <Link
                to={'/'}
                className={`${
                  urlCurrent === '/cerrar-sesión'
                    ? 'text-blue-300'
                    : 'text-white'
                } text-2xl hover:text-blue-300 flex gap-4 min-w-[21rem] cursor-pointer`}
              >
                <AiOutlinePoweroff size={'2rem'} /> Cerrar sesión
              </Link>
            </div>
          </div>
        </div>
        <div className='w-full container-1440'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default index
