import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDocument, setUser } from '../../redux/slices/users'

const index = () => {
  const dispatch = useDispatch()
  const { user, document } = useSelector(state => state.users)
  return (
    <>
      <div className='m-auto bg-white shadow-md px-5 py-5 rounded-xl w-full xl:w-2/3'>
        <div
          className='flex justify-end items-center'
          onClick={() => {
            dispatch(setUser(null))
            dispatch(setDocument(null))
          }}
        >
          <span className='text-black font-bold text-[18px] cursor-pointer'>
            X
          </span>
        </div>
        <div className=''>
          <h1 className='text-2xl text-center uppercase font-bold mb-10'>
            Detalle del cliente
          </h1>
        </div>
        <div className='flex flex-col xl:flex-row items-center gap-7 justify-center'>
          <div className='xl:grid xl:grid-cols-2'>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
              Tipo de identificación:
              <span className='normal-case font-normal'>
                {' '}
                {document?.docType}{' '}
              </span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
              Identificación:
              <span className='normal-case font-normal'> {document?.doc} </span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase w-full max-w-[400px]'>
              Nombre:
              <span className='normal-case font-normal'>
                {' '}
                {user?.info?.name}
              </span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
              Sexo:
              <span className='normal-case font-normal'>
                {' '}
                {user?.info?.gender}
              </span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
              Celular:
              <span className='normal-case font-normal'>
                {' '}
                {user?.info?.phone}
              </span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
              Estado:
              <span className='normal-case font-normal'>
                {' '}
                {user?.info?.stateAffiliate}
              </span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
              Categoría:
              <span className='normal-case font-normal'>
                {' '}
                {user?.info?.category}
              </span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
              Ips:
              <span className='normal-case font-normal'>
                {' '}
                {user?.info?.population}
              </span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
              Afiliación:
              <span className='normal-case font-normal'>
                {' '}
                {user?.info?.typeAffiliate}
              </span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
              Plan:
              <span className='normal-case font-normal'>
                {' '}
                {user?.info?.plan}
              </span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>
              Marcación especial:
              <span className='normal-case font-normal'>
                {' '}
                {user?.info?.specialMarking ? user?.info?.specialMarking : 'NO'}
              </span>
            </p>

            <p className='font-bold mb-3 text-gray-700 uppercase'>
              Empleadores:
              <span className='normal-case font-normal'>
                {' '}
                {user?.info?.employer}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default index
