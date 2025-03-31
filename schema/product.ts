import { z } from 'zod';

const valueSchema = z.object({
    id: z.string().min(1),
    value: z.string().min(1),
});

const attrSchema = z.object({
    id: z.string().min(1, 'Name attribute is required'),
    name: z.string().min(1),
    updateValueAttrDtos: z
        .array(valueSchema)
        .nonempty({ message: 'Array must have at least one item' }) // Ít nhất 1 phần tử
        .max(50, { message: 'Array must have at most 50 items' }) // Nhiều nhất 5 phần tử
        .refine(
            (arr) => new Set(arr.map((item) => item.value)).size === arr.length,
            {
                // Không trùng lặp
                message: 'Value must be unique',
            },
        ),
});

export const varientSchema = z.object({
    id: z.string().min(1),
    pieceAvail: z.string().min(1),
    price: z.string().min(1),
    discountPrice: z.string().optional(),
    // valueIds: z.array(z.string().min(1)).nonempty({ message: 'Array must have at least one item' }),
})

export const updateProductSchema = z.object({
    name: z.string().min(1),
    categoryId: z.string().min(1),
    tagIds: z
    .array(z.string()) // Mảng chứa các chuỗi
    .nonempty({ message: 'Array must have at least one item' }) // Ít nhất 1 phần tử
    .max(5, { message: 'Array must have at most 5 items' }) // Nhiều nhất 5 phần tử
    .refine((arr) => new Set(arr).size === arr.length, {
      message: 'Array items must be unique', // Không trùng lặp
    }),
    brandId: z.string().min(1),
    updateAttrProductDtos: z
        .array(attrSchema)
        .nonempty({ message: 'Array must have at least one item' }) // Ít nhất 1 phần tử
        .max(3, { message: 'Array must have at most 3 items' }) // Nhiều nhất 5 phần tử
        .refine(
            (arr) => new Set(arr.map((item) => item.name)).size === arr.length,
            {
                // Không trùng lặp
                message: 'Array items must be unique',
            },
        ),

    updateVarientDtos: z
        .array(varientSchema)
        .nonempty({ message: 'Array must have at least one item' }),
});


export type UpdateProduct = z.infer<typeof updateProductSchema>

export type UpdateAttrProductDto = z.infer<typeof attrSchema>

export type UpdateVariantDto = z.infer<typeof varientSchema>





export const productSchema = z.object({
    name: z.string().min(3, 'Name must contain at least 3 characters').max(200),
    categoryId: z
        .string()
        .min(3, 'Category name must contain at least 3 characters')
        .max(50),
    tagIds: z
        .array(z.string()) // Mảng chứa các chuỗi
        .nonempty({ message: 'Array must have at least one item' }) // Ít nhất 1 phần tử
        .max(5, { message: 'Array must have at most 5 items' }) // Nhiều nhất 5 phần tử
        .refine((arr) => new Set(arr).size === arr.length, {
            message: 'Array items must be unique', // Không trùng lặp
        }),
    brandId: z
        .string()
        .min(3, 'Brand name must contain at least 3 characters')
        .max(50),
});

export type CreateProduct = z.infer<typeof productSchema>;

export interface ICreateAttrProduct {
    name: string;
    hasImage: boolean;
    valueAttrs: ICreateValueAttr[];
}

export interface ICreateValueAttr {
    value: string;
}

export interface ICreateVarient {
    id?: string;
    attrValueNames: string[];
    pieceAvail: string;
    price: string;
    discountPrice?: number;
}

export interface ICreateProduct {
    name: string;
    categoryId: string;
    tagIds:  string[];
    brandId: string;
    attrProducts: ICreateAttrProduct[];
    createVarientDtos: ICreateVarient[];
}

