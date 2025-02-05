import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const imageProductSlice = createSlice({
  name: 'imageProductSlice',
  initialState: {
    value: ''
  },
  reducers: {
    setShowImage: (state, action: PayloadAction<string> )=>{
      state.value=action.payload
    }
  }
})

export const {setShowImage}= imageProductSlice.actions
export default imageProductSlice.reducer