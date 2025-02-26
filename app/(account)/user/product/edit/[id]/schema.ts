import {z} from 'zod'
import { productSchema } from '../../create/schema';



export type UpdateProduct = z.infer<typeof productSchema>;


export interface IUpdateTag{
  name: string
}

export interface IUpdateAttrProductDto {
  id: string,
  name:string,
  updateValueAttrDtos: IUpdateValueAttrDto[]
}

export interface IUpdateValueAttrDto {
  id: string,
  value: string
}

export interface IUpdateVarientDto {
  id: string
  pieceAvail: string,
  price: string,
  discountPrice?: string,
}


export interface IUpdateProduct {
  name : string
  categoryName: string
  tags: IUpdateTag[]
  brandId: string,

  updateAttrProductDtos: IUpdateAttrProductDto[]

}