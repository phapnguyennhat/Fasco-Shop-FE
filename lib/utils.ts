import { UpdateAttrProductDto } from '@/schema/product';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function fetcher<T>(input: string, init?: RequestInit) {

  try{
    const response = await fetch(`${process.env.BACKEND_URL}/${input}`, init);
    const json = await response.json()
   
    return json as T;

  }catch (error:any){
    // console.log({error})
     return {
       statusCode: 500,
       message: 'Server Error'
    }
  }
  
}

export const formatNumber = (num: number) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace('.0', '') + 'tr';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return num.toString();
};

export type SearchParams = { [key: string]: string | string[] | undefined };



export const createQueryString = (name: string |undefined, value: string, queryParams: SearchParams) => {
  const params = new URLSearchParams(queryParams as any);
  

  if(!name){
    return params.toString()
  }

  if(params.get(name)===value){
    params.delete(name)
    
  }else{
    params.set(name, value);
  }
  

  return params.toString();
};


export function formatEstimatedDelivery(minDays: number, maxDays: number): string {
  const today = new Date();

  // Tính ngày giao hàng tối thiểu và tối đa
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + minDays);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + maxDays);

  const sameMonth = minDate.getMonth() === maxDate.getMonth();
  const minMonthShort = minDate.toLocaleString('en-US', { month: 'short' });
  const maxMonthShort = maxDate.toLocaleString('en-US', { month: 'short' });

  const minDay = minDate.getDate();
  const maxDay = maxDate.getDate();


    return `${minMonthShort} ${minDay} - ${maxMonthShort} ${maxDay}`;
}

export const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};


 export function cartesianProduct(arr: string[][]): string[][] {
  return arr.reduce<string[][]>(
      (acc, group) => acc.flatMap(item => group.map(value => [...item, value])),
      [[]] // Bắt đầu với [[]] để tạo mảng lồng nhau
  );
}


export function getPriceVarient(varient: Varient){
  if(varient.discountPrice>0){
    return varient.discountPrice
  }
  return varient.price
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function findValueNames(valueIds: string [], updateAttrProductDtos :UpdateAttrProductDto[]): string{
  return valueIds.map(valueId => {
    const attr = updateAttrProductDtos.find(attr => attr.updateValueAttrDtos.some(value => value.id === valueId))
    if(attr){
      const value = attr.updateValueAttrDtos.find(value => value.id === valueId)
      if(value){
        return value.value
      }
    }
    return ''
  }).join('-')
}

export function  cartesian(arr: any) {
 
  const res = arr.reduce(
    (acc:any, group: any ) =>
      acc.flatMap((item:any) => group.map((value:any) => [...item, value])),
    [[]]
  );
  return res
 
}


export function isErrorResponse(response: any): response is { statusCode: number, message: string } {
  if(!response){
    return false
  }
  return 'statusCode' in response;
}

