import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const extraNavSlice = createSlice({
  name: 'extraNav', 
  initialState: {
    value: false
  },
  reducers: {
    setExtraNav : (state, action: PayloadAction<boolean>)=>{
      state.value=action.payload
    }
  }
})

export const {setExtraNav} = extraNavSlice.actions
export default extraNavSlice.reducer