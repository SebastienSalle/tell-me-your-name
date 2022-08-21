import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName:'',
    lastName:'',
    portion:'',
    gender:'',
    genderConfirmation:'',
    age:''
  },
  reducers: {
    updateFirstName: (state, action) => {
        state.firstName = action.payload;
    },
    updateLastName: (state, action) => {
        state.lastName = action.payload;
    },
    updatePortion: (state, action) => {
      state.portion = action.payload;
    },
    updateGender: (state, action) => {
      state.gender = action.payload;
    },
    updateGenderConfirmation: (state, action) => {
      state.genderConfirmation = action.payload;
    },
    updateAge: (state, action) => {
      state.age = action.payload;
    },

  },
})

export const { updateFirstName, updateLastName, updatePortion, updateGender, updateGenderConfirmation, updateAge } = userSlice.actions

export default userSlice.reducer;