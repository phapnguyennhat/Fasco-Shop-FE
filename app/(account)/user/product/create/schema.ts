import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(3, 'Name must contain at least 3 characters').max(200),
    categoryName: z
        .string()
        .min(3, 'Category name must contain at least 3 characters')
        .max(50),
    tags: z
        .array(z.object({
            name: z.string().min(1)
        }))
        .nonempty({ message: 'Array must have at least one item' }) // Ít nhất 1 phần tử
        .max(5, { message: 'Array must have at most 5 items' }) // Nhiều nhất 5 phần tử
        .refine((arr) => new Set(arr.map(item =>item.name)).size === arr.length, {
            // Không trùng lặp
            message: 'Array items must be unique',
        }),
    brandId: z
        .string()
        .min(3, 'Brand name must contain at least 3 characters')
        .max(50),
    
});

export type CreateProduct = z.infer<typeof productSchema>;


export interface ICreateAttrProduct {
    name: string,
    hasImage: boolean,
    valueAttrs: ICreateValueAttr[]
}

export interface ICreateValueAttr {
    value: string
}

export interface ICreateVarient {
    id?:string
    attrValueNames: string[]
    pieceAvail: string,
    price: string
    discountPrice?:number
}


export interface ICreateProduct  {
    name: string,
    categoryName: string
    tags: {name: string}[]
    brandId: string,
    attrProducts: ICreateAttrProduct[]
    createVarientDtos: ICreateVarient[]
}