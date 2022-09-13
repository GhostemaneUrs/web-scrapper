import Alert from '../Alert'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getAffiliates, getEntity } from '../../redux/slices/entities'

const index = () => {
  const dispatch = useDispatch()
  const { entity, documents } = useSelector(state => state.entities)

  const schemaValidateUser = Yup.object().shape({
    entity: Yup.string().required('Selecciona una entidad'),
    doc: Yup.string().required('Ingresa tu número de documento'),
    docType: Yup.string().required('Selecciona un tipo de documento'),
    entityType: Yup.string().required('El tipo de entidad es requerido'),
  })

  const [validateUser, setValidateUser] = useState({
    doc: '',
    entity: '',
    docType: '',
    entityType: '',
  })

  useEffect(() => {
    dispatch(getEntity())
  }, [])

  const handleSubmit = values => {
    setValidateUser(values)
    dispatch(getAffiliates(values))
  }

  return (
    <Formik
      initialValues={{
        doc: '',
        entity: '',
        docType: '',
        entityType: '',
      }}
      validationSchema={schemaValidateUser}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values)
        resetForm()
      }}
    >
      {({ errors, touched }) => (
        <Form
          className='bg-white shadow-md rounded-xl py-10 px-5'
          autoComplete='off'
        >
          <div className='mb-5'>
            <label className='text-gray-800 uppercase font-bold' htmlFor='name'>
              Tipo de entidad
            </label>
            <Field
              as='select'
              name='entityType'
              className='block w-full p-2 bg-gray-100 outline-none'
            >
              <option defaultChecked value='none'>
                -Seleccione-
              </option>
              <option value='eps'>EPS</option>
              <option value='special_agreement'>Convenios especiales</option>
            </Field>
            {errors.entityType && touched.entityType ? (
              <Alert>{errors.entityType}</Alert>
            ) : null}
          </div>
          <div className='mb-5'>
            <label className='text-gray-800 uppercase font-bold' htmlFor='name'>
              Entidad
            </label>
            <Field
              as='select'
              name='entity'
              className='block w-full p-2 bg-gray-100 outline-none'
            >
              <option defaultChecked value='none'>
                -Seleccione-
              </option>
              {entity?.map((item, index) => {
                return (
                  <option key={index} value={item.nit}>
                    {item.name}
                  </option>
                )
              })}
            </Field>
            {errors.entity && touched.entity ? (
              <Alert>{errors.entity}</Alert>
            ) : null}
          </div>
          <div className='mb-5'>
            <label
              htmlFor='docType'
              className='block text-gray-700 uppercase font-bold'
            >
              Tipo de identificación
            </label>
            <Field
              as='select'
              name='docType'
              className='block w-full p-2 bg-gray-100 outline-none'
            >
              <option defaultChecked value='none'>
                -Seleccione-
              </option>
              {documents?.map((item, index) => {
                return (
                  <option key={index} value={item.description}>
                    {item.description}
                  </option>
                )
              })}
            </Field>
            {errors.docType && touched.docType ? (
              <Alert>{errors.docType}</Alert>
            ) : null}
          </div>
          <div className='mb-5'>
            <label
              htmlFor='doc'
              className='block text-gray-700 uppercase font-bold'
            >
              Identificación
            </label>
            <Field
              type='text'
              name='doc'
              className='block w-full p-2 bg-gray-100 outline-none'
            />
            {errors.doc && touched.doc ? <Alert>{errors.doc}</Alert> : null}
          </div>
          <input
            type='submit'
            className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-900 cursor-pointer transition-all'
            value={'Consultar'}
          />
        </Form>
      )}
    </Formik>
  )
}

export default index
