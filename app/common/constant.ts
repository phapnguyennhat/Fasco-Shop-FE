import { validateHeaderValue } from "http";
import { ECollection } from "./enum";

export const sizes = ['S', 'M', 'L', 'XL'];
export const prices = [
    {
        name: '$0-$50',
        minPrice: 0,
        maxPrice: 50
    },
    {
        name: '$50-$100',
        minPrice: 50,
        maxPrice: 100
    },
    {
        name: '$100-$150',
        minPrice: 100,
        maxPrice: 150,
    },
    {
        name: '$150-$200',
        minPrice: 150,
        maxPrice: 200
    },
    {
        name: '$200-$300',
        minPrice: 200,
        maxPrice: 300
    },
];

export const collections = [
    {
        name: 'All Products',
        value: ECollection.ALLPRODUCT,
    },
    {
        name: 'Best Seller',
        value: ECollection.BESTSELLER,
    },
    {
        name: 'New Arrivals',
        value: ECollection.NEWARRIVAL
    },
    {
        name: 'Price: Low to High',
        value: ECollection.LOWTOHIGH,
    },
    {
        name: 'Price: High to Low',
        value: ECollection.HIGHTOLOW
    }
]

export const FIVEMINUTES = 5*60


export const minDelivery = 3
export const maxDelivery = 7

export const minOrderFreeShip = 75
export const feeShip =  40
export const feeWrap = 10
