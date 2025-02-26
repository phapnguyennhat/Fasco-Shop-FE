import { ICreateVarient } from "@/app/(account)/user/product/create/schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IVariants {
  variants: ICreateVarient[]
}

export const variantSlice = createSlice({
  name: 'varient',
  initialState: {
    value: { variants: []} as IVariants
  },
  reducers: {
    resetVariant : (state)=>{
      state.value = {variants: []}
    },
    initVarients : (state, action: PayloadAction<{variations: string[][]}>)=>{
      const {variations} = action.payload
      state.value.variants = variations.map(item => ({attrValueNames: item, price: '', pieceAvail: ''}))
    },

    setVariants: (state, action: PayloadAction<ICreateVarient[]>) =>{
      state.value.variants=action.payload
    },

    setPrice: (state, action: PayloadAction<{indexVariant: number, price: string}>) =>{
      const {indexVariant, price} = action.payload
      state.value.variants[indexVariant].price = price
    },

    setPieceAvail : (state, action: PayloadAction<{indexVariant: number, pieceAvail: string}>)=>{
      const {indexVariant, pieceAvail} = action.payload
      state.value.variants[indexVariant].pieceAvail = pieceAvail
    }
    
  
  }
})

export const {resetVariant,initVarients,setPieceAvail,setPrice, setVariants} = variantSlice.actions

export default variantSlice.reducer