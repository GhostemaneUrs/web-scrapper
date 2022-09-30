import Swal from 'sweetalert2'
import { logout } from './auth'
import { URL_GATEWAY } from '../../helpers/constants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setUser, setUsers } from './users'

const initialState = {
  entity: [],
  documents: [
    {
      id: 1,
      description: 'CC',
      active: 1,
      prefix: 'cc',
      name: 'Cédula de ciudadanía',
    },
    {
      id: 2,
      description: 'CE',
      active: 1,
      prefix: 'ce',
      name: 'Cédula de extranjería',
    },
    {
      id: 4,
      description: 'PA',
      active: 1,
      prefix: 'pa',
      name: 'Pasaporte',
    },
    {
      id: 5,
      description: 'NIT',
      active: 1,
      prefix: 'nu',
      name: 'Numero de identificación tributaria',
    },
    {
      id: 6,
      description: 'TI',
      active: 1,
      prefix: 'ti',
      name: 'Tarjeta de identidad',
    },
  ],
}

export const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    setEntity: (state, action) => {
      state.entity = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setDocuments: (state, action) => {
      state.documents = action.payload
    },
    setLoadingValidation: (state, action) => {
      state.loadingValidation = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getEntity.rejected, (state, action) => {
      state.entity = []
      state.loading = false
    })
    builder.addCase(getEntity.fulfilled, (state, action) => {
      state.loading = false
      state.entity = action.payload
    })
    builder.addCase(getAffiliates.rejected, (state, action) => {
      state.loadingValidation = false
    })
    builder.addCase(getAffiliates.fulfilled, (state, action) => {
      state.loadingValidation = false
    })
  },
})

export const { setEntity, setLoading, setLoadingValidation, setDocuments } =
  entitiesSlice.actions

export const getEntity = createAsyncThunk(
  'entity/getEntity',
  async (data, thunkApi) => {
    thunkApi.dispatch(setLoading(true))
    await fetch(
      `${URL_GATEWAY}/entity/${data ? `?${new URLSearchParams(data)}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => {
        res.json().then(data => {
          if (data.statusCode === 200) {
            thunkApi.dispatch(setEntity(data.results))
            thunkApi.dispatch(setLoading(false))
          }
          if (data.statusCode === 400) {
            Swal.fire({
              timer: 3000,
              icon: 'error',
              title: 'Error',
              text: data.message,
              showConfirmButton: false,
            })
          }
          if (data.statusCode === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.message,
              showConfirmButton: true,
            }).then(result => {
              if (result.isConfirmed) {
                thunkApi.dispatch(logout())
              }
            })
          }
        })
      })
      .catch(err => {
        if (err) {
          Swal.fire({
            timer: 3000,
            icon: 'error',
            title: 'Error',
            text: 'Error de conexión',
            showConfirmButton: false,
          })
        }
      })
  }
)

export const getAffiliates = createAsyncThunk(
  'entity/getAffiliates',
  async (data, thunkApi) => {
    thunkApi.dispatch(setLoadingValidation(true))
    const users = thunkApi.getState()?.users?.users
    await fetch(
      `${URL_GATEWAY}/affiliateValidation/${
        data ? `?${new URLSearchParams(data)}` : ''
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => {
        res.json().then(data => {
          if (data.statusCode === 200) {
            thunkApi.dispatch(setUser(data.results))
            thunkApi.dispatch(setLoadingValidation(false))
          }
          if (data.statusCode === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.msg,
              showConfirmButton: true,
            })
            thunkApi.dispatch(setLoadingValidation(false))
          }
          if (data.statusCode === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.message,
              showConfirmButton: true,
            }).then(result => {
              if (result.isConfirmed) {
                thunkApi.dispatch(logout())
              }
            })
          }
          if (data.statusCode === 500) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.msg,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
            })
            thunkApi.dispatch(setLoadingValidation(false))
          }
        })
      })
      .catch(err => {
        if (err) {
          Swal.fire({
            timer: 3000,
            icon: 'error',
            title: 'Error',
            text: 'Error de conexión',
            showConfirmButton: false,
          })
        }
      })
  }
)

export const uploadFile = createAsyncThunk(
  'entity/uploadFile',
  async (data, thunkApi) => {
    let fd = new FormData()
    Object.keys(data).forEach(key => {
      fd.append(key, data[key])
    })
    thunkApi.dispatch(setLoading(true))
    await fetch(`${URL_GATEWAY}/loadExcel/`, {
      method: 'POST',
      body: fd,
    })
      .then(res => {
        res.json().then(data => {
          if (data.statusCode === 201) {
            Swal.fire({
              timer: 3000,
              icon: 'success',
              title: 'Éxito',
              text: data.msg,
              showConfirmButton: false,
            })
            thunkApi.dispatch(setLoading(false))
          }
          if (data.statusCode === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.msg,
              showConfirmButton: true,
            })
            thunkApi.dispatch(setLoading(false))
          }
          if (data.statusCode === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.msg,
              showConfirmButton: true,
            }).then(result => {
              if (result.isConfirmed) {
                thunkApi.dispatch(logout())
              }
            })
          }
        })
      })
      .catch(err => {
        if (err) {
          Swal.fire({
            timer: 3000,
            icon: 'error',
            title: 'Error',
            text: 'Error de conexión',
            showConfirmButton: false,
          })
        }
      })
  }
)

export default entitiesSlice.reducer
