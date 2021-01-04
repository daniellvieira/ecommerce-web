import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// documentacao do https://redux-toolkit.js.org/api/createSlice

import User from '../../../dtos/User'

const authSlice = createSlice({
  name: 'auth',
  initialState: { loggedUser: null as User },
  reducers: {
    setLoggedUser(state, action: PayloadAction<User>) {
      state.loggedUser = action.payload
    },
    clearLoggedUser(state) {
      state.loggedUser = null
    },
  }
})

export const { setLoggedUser, clearLoggedUser } = authSlice.actions
export default authSlice.reducer
