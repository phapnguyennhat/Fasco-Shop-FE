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
    images: Image[]
  }

  interface Image {
    id: string
    url: string
    key: string
  }

  interface User{
    id: string
    name: string
  }
}