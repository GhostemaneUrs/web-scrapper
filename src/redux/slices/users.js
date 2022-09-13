import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: [],
  users: [],
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
  },
})

export const { setUsers, setUser, setLoading } = usersSlice.actions

export default usersSlice.reducer
