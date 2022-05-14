import React, { useState } from 'react'
import Card from './card'

const index = () => {
  const [user, setUser] = useState(0)
  return (
    <>
      {user === 0 ? (
        <div className='md:w-1/2 lg:w-3/5'>
          <h2 className='font-black text-3xl text-center mb-1'>
            No hay paciente
          </h2>
          <p className='text-xl text-center mb-5 '>
            Añade paciente {''}
            <span className='text-indigo-600 font-bold'>
              {' '}
              y visualiza su seguimiento
            </span>
          </p>
        </div>
      ) : (
        <div className='md:w-1/2 lg:w-3/5'>
          <Card />
        </div>
      )}
    </>
  )
}

export default index
