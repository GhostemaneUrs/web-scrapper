import React from 'react'
import { HiEye } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const index = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1 className='font-black text-4xl text-blue-900 mb-3'>Pacientes</h1>
      <p className='mb-7 text-2xl'>Administra tus pacientes</p>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full table-auto shadow bg-white'>
                <thead className='bg-blue-900 text-white uppercase'>
                  <tr>
                    <th className='px-4 py-2'>Nombre</th>
                    <th className='px-4 py-2'>Entidad</th>
                    <th className='px-4 py-2'>Email</th>
                    <th className='px-4 py-2'>Celular</th>
                    <th className='px-4 py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aqui va el map de los datos de los clientes */}
                  <tr className='text-center border-b hover:bg-gray-50 cursor-pointer'>
                    <td className='p-3'>Andres Felipe Jaramillo Gonzalez</td>
                    <td className='p-3'>Sura</td>
                    <td className='p-3'>JaramilloG1999@outlook.com</td>
                    <td className='p-3'>3043512931</td>
                    <td className='p-3'>
                      <div className='flex justify-center items-center'>
                        <HiEye
                          className='text-indigo-500 hover:text-indigo-600 cursor-pointer text-xl'
                          onClick={() => {
                            navigate(`/validator/detail`)
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
