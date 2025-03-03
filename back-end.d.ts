import { AuthBy, ERole, EStatusOrder } from "./app/common/enum";
export {};


declare global{

  interface IError {
    message: string,
    status: number
  }

  interface IResponse  {
    message: string
  }


  interface Product{
    id: string
    name: string
    starRating: number
    user: User
    brandId: string
    reviewNumber: number;
    price: number;
    tags: ITag[]
    discountPrice: number
    pieceAvail: number
    sold: number
    attrProducts: IAttrProduct[]
    images: ImageFile[]
    favoriteDetails: IFavoriteDetail[]
    varients: Varient[]
    category: ICategory
    
  }

  interface Varient {
    id: string,
    productId: string
    pieceAvail: number
    sold: number,
    price: number,
    discountPrice: number
    product: Product
    valueAttrs: IValueAttr[]
  }

  interface IAttrProduct {
    id: string
    name: string,
    productId: string
    hasImage: string
    valueAttrs: IValueAttr[]
  }

  interface IValueAttr {
    id: string
    value: string
    image: ImageFile
    attrName: string
    attrProduct: IAttrProduct
  }
  

  interface ImageFile {
    id: string
    url: string
    key: string
  }

  interface User{
    id: string
    name: string
    username: string
    email: string
    authBy: AuthBy
    role: ERole
    avatar: ImageFile
    birthday?: string
    gender?: string
    phoneNumber?:string

  }

  interface LoginToken {
    accessTokenCookie: Token
    refreshTokenCookie: Token
  }

  interface Token {
    token: string,
    accessTime: number;
    cookie: string
  }

  interface ICartItem {
    id: string
    quantity: number
    varient: Varient
  }

  interface IProvince {
    id: string,
    name: string
    districts: IDistrict[]
  }

  interface IDistrict {
    id: string
    name: string
    communes: ICommune[]
  }

  interface ICommune {
    id: string
    name: string
  }

  interface IAddress {
    id: string
    userId: string
    orderId: string
    email: string
    fullName: string
    // lastName: string
    phoneNumber: string
    provinceId: string
    districtId: string
    communeId: string
    street: string

    province: IProvince
    district: IDistrict
    commune: ICommune
  }

  interface IFavoriteDetail {
    userId: string
    productId: string
    createAt: string
    product: Product
  }

  interface ICategory {
    id: string
    name: string
  }

  interface ITotalOrder{
    subTotal: number
    wrap?: number
    shipping?:number
  }

  interface IOrder {
      id: string
      status: EStatusOrder;
      createAt: string;
      updateAt: string;
      totalOrder: ITotalOrder;
      orderItems: IOrderItem[]
      address: IAddress
  }

  interface IOrderItem {
    price: number
    quantity: number
    varient: Varient
  }

  interface IBrand{
    id: string
    name: string
    image: ImageFile
    imageId: string
  }

  interface ITag{
    id: string
    name: string
  }
  
  interface InsertResult {
      identifiers: { id: string }[];
  }

}