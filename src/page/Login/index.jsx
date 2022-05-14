import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../../components/Alert'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import welcome from '../../assets/img/welcome.svg'

const index = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  const loginValues = Yup.object().shape({
    email: Yup.string().email().required('El email es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
  })

  const handleSubmit = values => {
    setUser(values)
    navigate('/validator')
  }

  return (
    <div className='container h-screen m-auto flex justify-center items-center gap-10 p-4 md:p-0'>
      <div className='lg:w-2/5 hidden lg:block'>
        <img src={welcome} alt='welcome-img' />
      </div>
      <div className='h-full md:xl:lg:w-6/12 flex justify-center items-center'>
        <div className='m-auto py-10 px-10 sm:p-20 xl:w-10/12 bg-white shadow'>
          <div className='space-y-4 text-center'>
            <p className='font-medium text-lg text-gray-600 mb-10'>Log in!</p>
          </div>

          <div role='hidden' className='border-t' />
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginValues}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values)
              resetForm()
            }}
          >
            {({ errors, touched }) => (
              <Form autoComplete='off' className='space-y-6 py-6'>
                <div className='mb-5'>
                  <Field
                    type='email'
                    name='email'
                    placeholder='Your Email'
                    className='w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none outline-none'
                  />
                  {errors.email && touched.email ? (
                    <Alert>{errors.email}</Alert>
                  ) : null}
                </div>

                <div className='mb-5'>
                  <Field
                    type='password'
                    name='password'
                    placeholder='Your Password'
                    className='w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none outline-none'
                  />
                  {errors.password && touched.password ? (
                    <Alert>{errors.password}</Alert>
                  ) : null}
                </div>

                <div>
                  <button
                    type='submit'
                    className='w-full px-6 py-3 rounded-xl bg-indigo-600 transition hover:bg-indigo-700 mb-5'
                  >
                    <span className='font-semibold text-white text-lg uppercase'>
                      Login
                    </span>
                  </button>
                  <Link to='/register'>
                    <span className='text-md tracking-wide text-blue-600 hover:text-blue-700'>
                      Don't have an account with us?
                    </span>
                  </Link>
                </div>
                <div role='hidden' className='mt-12 border-t' />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default index
