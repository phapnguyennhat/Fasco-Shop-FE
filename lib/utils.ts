import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function fetcher<T>(input: string, init?: RequestInit) {
    const response = await fetch(`${process.env.BACKEND_URL}/${input}`, init);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong', {
            cause: response.status,
        });
    }
    return response.json() as T;
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