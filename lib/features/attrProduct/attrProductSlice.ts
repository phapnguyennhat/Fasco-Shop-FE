import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAttributes {
    nameAttrs: string[];
    values: string[][];
    valueImages: Blob[];
}

export const attrProductSlice = createSlice({
    name: 'attrProduct',
    initialState: {
        value: {
            nameAttrs: [''],
            values: [['']],
            valueImages: [],
        } as IAttributes,
    },
    reducers: {

        resetAttr: (state)=>{
            state.value = {nameAttrs: [''], values: [['']], valueImages: []}
        },


        setAttrName: (
            state,
            action: PayloadAction<{ indexAttr: number; attrName: string }>,
        ) => {
            const { attrName, indexAttr } = action.payload;
            state.value.nameAttrs[indexAttr] = attrName;
        },

        newAttr: (state) => {
            const { nameAttrs, values } = state.value;
            state.value.nameAttrs = [...nameAttrs, ''];
            state.value.values = [...values, ['']];
        },

        newValue: (state, action: PayloadAction<{ indexAttr: number }>) => {
            const { indexAttr } = action.payload;
            const attrValue = state.value.values[indexAttr];
            state.value.values[indexAttr] = [...attrValue, ''];
        },

       

        setValue: (
            state,
            action: PayloadAction<{
                indexAttr: number;
                indexValue: number;
                value: string;
            }>,
        ) => {
            const { indexAttr, indexValue, value } = action.payload;
            state.value.values[indexAttr][indexValue] = value;
        },

        removeValue: (
            state,
            action: PayloadAction<{ indexAttr: number; indexValue: number }>,
        ) => {
            const { indexAttr, indexValue } = action.payload;
            const attrValue = state.value.values[indexAttr];
            state.value.values[indexAttr] = attrValue.filter(
                (_, index) => index !== indexValue,
            );
        },


        removeAttr: (state, action: PayloadAction<{ indexAttr: number }>) => {
            const { indexAttr } = action.payload;
            const { nameAttrs, values } = state.value;

            state.value.nameAttrs = nameAttrs.filter(
                (_, index) => index !== indexAttr,
            );
            state.value.values = values.filter(
                (_, index) => index !== indexAttr,
            );
        },
    },
});

export const {
    resetAttr,
    removeAttr,
    removeValue,
    setAttrName,
    setValue,
    newAttr,
    newValue,
} = attrProductSlice.actions;

export default attrProductSlice.reducer;
