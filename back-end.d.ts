export {};


declare global{
  interface Product{
    id: string
    image?: Image
    name: string
    starRating: number
    user: User
    reviewNumber: number;
    price: number;
    pieceAvail: number
    sold: number
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