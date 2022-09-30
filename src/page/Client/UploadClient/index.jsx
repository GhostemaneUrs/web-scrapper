import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import Alert from '../../../components/Alert'
import { getEntity, uploadFile } from '../../../redux/slices/entities'
import { useDispatch, useSelector } from 'react-redux'
import { convertToBase64 } from '../../../helpers/functions'

const index = () => {
  const dispatch = useDispatch()
  const [source, setSource] = useState({})
  const { entity } = useSelector(state => state.entities)

  const schemaValidateUser = Yup.object().shape({
    entity: Yup.string().required('Selecciona una entidad'),
  })

  useEffect(() => {
    dispatch(getEntity({ entityType: 'special_agreement' }))
  }, [])

  const validateFile = () => {
    let archivo = document.getElementById('archivo').value
    let nameFile = document
      .getElementById('archivo')
      .files[0].name.split('.')[0]
    let nameExtension = document.getElementById('archivo').files[0].name
    let extension = archivo.substring(archivo.lastIndexOf('.'), archivo.length)
    if (
      document
        .getElementById('archivo')
        .getAttribute('accept')
        .split(',')
        .indexOf(extension) < 0
    ) {
      Swal.fire({
        timer: 3000,
        icon: 'error',
        title: 'Error',
        showConfirmButton: false,
        text: `${nameFile} no tiene un formato valido`,
      })
    } else {
      setSource([document.getElementById('archivo').files[0]])
      convertToBase64(document.getElementById('archivo').files[0]).then(
        data => {
          setSource({
            ...source,
            filename: nameExtension,
            excel: document.getElementById('archivo').files[0],
          })
        }
      )
    }
  }

  const handleSubmit = () => {
    dispatch(uploadFile(source))
  }

  return (
    <div>
      <div>
        <h1 className='text-4xl text-center uppercase font-bold text-indigo-900 mb-10'>
          Cargar excel
        </h1>
      </div>
      <div className='w-full max-w-[600px] m-auto bg-white shadow-md rounded-xl py-10 px-5 '>
        <Formik
          initialValues={{
            entity: '',
          }}
          validationSchema={schemaValidateUser}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values)
            resetForm()
          }}
          onChan
        >
          {({ errors, touched, handleChange }) => (
            <Form autoComplete='off'>
              <div className='mb-5'>
                <label
                  className='text-gray-800 uppercase font-bold'
                  htmlFor='name'
                >
                  Entidad
                </label>
                <Field
                  as='select'
                  name='entity'
                  className='block w-full p-2 bg-gray-100 outline-none'
                  onChange={e => {
                    handleChange(e)
                    setSource({ entity: e.target.value })
                  }}
                >
                  <option defaultChecked value='none'>
                    -Seleccione-
                  </option>
                  {entity?.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    )
                  })}
                </Field>
                {errors.entity && touched.entity ? (
                  <Alert>{errors.entity}</Alert>
                ) : null}
              </div>
              <div className='border-[0.6px] solid border-light-gray rounded-[6px] bg-white mb-3'>
                <div
                  className={`flex flex-col justify-center items-center h-full min-h-[128px] max-h-[128px] cursor-pointer`}
                >
                  <label className='w-full border-none flex flex-col justify-center items-center cursor-pointer'>
                    <div className='flex justify-center items-center'>
                      <span className='material-icons text-indigo-900 text-[43px]'>
                        upload
                      </span>
                    </div>
                    <input
                      id='archivo'
                      type='file'
                      accept='.xls,.xlsx,.csv'
                      onChange={() => validateFile()}
                    />
                    <div>
                      <span className='text-indigo-900 font-bold text-[16px]'>
                        {!source?.filename && 'Cargar datos .xls .xlsx .csv'}
                        {source?.filename && source?.filename}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
              <input
                type='submit'
                onClick={() => handleSubmit()}
                className='bg-indigo-900 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-all'
                value={'Cargar datos'}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default index
