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
    favoriteDetails: IFavoriteDetail[]
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
    userId: string
    email: string
    firstName: string
    lastName: string
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
  }
}