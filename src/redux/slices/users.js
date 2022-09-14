import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  users: [],
  document: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setDocument: (state, action) => {
      state.document = action.payload
    },
  },
})

export const { setUsers, setUser, setLoading, setDocument } = usersSlice.actions

export default usersSlice.reducer
