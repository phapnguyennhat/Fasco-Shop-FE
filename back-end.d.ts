export {};


declare global{
  interface Product{
    id: string
    name: string
    starRating: number
    user: User
    reviewNumber: number;
    price: number;
    pieceAvail: number
    sold: number
    attrProducts: IAttrProduct[]
    images: Image[]
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
    name: string,
    productId: string
    hasImage: string
    valueAttrs: IValueAttr[]
  }

  interface IValueAttr {
    value: string
    image: ImageFile
    attrName: string
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
    avatar: Image

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
}