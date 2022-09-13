import React from 'react'
import Lottie from 'lottie-react'
import { useSelector } from 'react-redux'
import Form from '../../../components/Form'
import loadingAnimate from '../../../assets/lotties/loading.json'

const index = () => {
  const { users } = useSelector(state => state.users)
  console.log("🚀 ~ file: index.jsx ~ line 9 ~ index ~ users", users);
  const { loadingValidation } = useSelector(state => state.entities)
  return (
    <>
      <div>
        <h1 className='text-4xl text-center uppercase font-bold text-indigo-900 mb-2 2xl:mb-10'>
          Validador de derechos
        </h1>
        {loadingValidation ? (
          <div className='w-full max-w-[500px] absolute m-auto top-[30%] left-[0%] right-0 bottom-0 z-[15]'>
            <Lottie animationData={loadingAnimate} />
          </div>
        ) : (
          <div className='container-800'>
            <Form />
          </div>
        )}
      </div>
    </>
  )
}

export default index
