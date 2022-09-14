import Swal from 'sweetalert2'
import { URL_GATEWAY } from '../../helpers/constants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  account: null,
  loading: false,
  loadingHome: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setAccount: (state, action) => {
      state.account = action.payload
    },
    setLoadingHome: (state, action) => {
      state.loadingHome = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(login.rejected, (state, action) => {
      state.user = {}
      state.account = {}
      state.loading = false
      state.loadingHome = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false
      state.loadingHome = true
      state.user = action.payload
      state.account = action.payload
    })
  },
})

export const { setUser, setLoading, setAccount, setLoadingHome } =
  authSlice.actions

export const logout = () => {
  return dispatch => {
    dispatch(setUser(null))
    dispatch(setAccount(null))
  }
}

export const login = createAsyncThunk('auth/login', async (data, thunkApi) => {
  thunkApi.dispatch(setLoading(true))
  thunkApi.dispatch(setLoadingHome(true))
  await fetch(`${URL_GATEWAY}/security/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      res.json().then(data => {
        if (res.status === 200) {
          thunkApi.dispatch(setUser(data.results))
          thunkApi.dispatch(setLoading(false))
          data.results?.permissions?.length === 1
            ? thunkApi.dispatch(setAccount(data.results?.permissions[0]))
            : thunkApi.dispatch(setAccount(null))
        }
        if (res.status === 400) {
          Swal.fire({
            title: 'Error',
            text: data.message,
            icon: 'error',
            timer: 3000,
            showConfirmButton: false,
          })
        }
      })
    })
    .catch(err => {
      if (err) {
        Swal.fire({
          title: 'Error',
          text: 'Error de conexión',
          icon: 'error',
          timer: 3000,
          showConfirmButton: false,
        })
      }
    })
})

export const rememberPassword = createAsyncThunk(
  'auth/rememberPassword',
  async (data, thunkApi) => {
    thunkApi.dispatch(setLoading(true))
    await fetch(`${URL_GATEWAY}/security/pwdremember/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        res.json().then(data => {
          if (res.status === 200) {
            Swal.fire({
              title: '¡Listo!',
              text: `Se ha enviado una contraseña provisional al correo: ${data?.results?.email}, para restablecer su contraseña`,
              icon: 'success',
              timer: 4000,
              showConfirmButton: false,
            })
            thunkApi.dispatch(setLoading(false))
          }
          if (res.status === 400) {
            Swal.fire({
              title: '¡Error!',
              text: 'No se encontró el usuario enviado',
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
            })
            thunkApi.dispatch(setLoading(false))
          }
        })
      })
      .catch(err => {
        if (err) {
          Swal.fire({
            title: '¡Error!',
            text: 'No se pudo enviar el correo',
          })
        }
      })
  }
)

export default authSlice.reducer
