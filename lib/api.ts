import { FIVEMINUTES } from '@/app/common/constant';
import getAuthCookies from './getAuthCookie';
import { fetcher, isErrorResponse } from './utils';
import { number } from 'zod';
import { count, error } from 'console';
import { notFound } from 'next/navigation';

export async function getProfile() {
    try {
        const authCookie = await getAuthCookies();
        const profile = await fetcher<User>('user/profile', {
            method: 'GET',
            headers: {
                Cookie: authCookie,
            },
            credentials: 'include',
            next: {
                revalidate: FIVEMINUTES,
                tags: [ 'profile']
            },
        });
        if(isErrorResponse(profile)){
            return undefined
        }
        return profile;
    } catch (error: any) {
        return undefined;
    }
}

export async function getCart() {
    try {
        const authCookie = await getAuthCookies();
        const cartItems= await fetcher<ICartItem[]>('cart', {
            method: 'GET',
            headers: {
                Cookie: authCookie,
            },
            credentials: 'include',
            next: {
                revalidate: FIVEMINUTES,
                tags: ['cartItem']
            },
        });
        if(isErrorResponse(cartItems)){
            return []
        }
        return cartItems
    } catch (error) {
      return []
    }
}

export async function getProvinces (){
    try{
        const provinces = await fetcher<IProvince[]>('province', {
            method: 'GET',
            next:{
                revalidate: FIVEMINUTES
            }
        })
        if(isErrorResponse(provinces)){
            return []
        }
        return provinces
    }catch(error) {
       
        return []
    }
}

export async function getProvinceById(id: string|undefined){
    if(!id){
        return undefined
    }
    try {
        const province = await fetcher<IProvince>(`province/${id}`,{
            method:'GET',
            next: {
                revalidate: FIVEMINUTES
            }
        })
        if(isErrorResponse(province)){
            return undefined
        }
        return province
    } catch (error) {
        return undefined
    }
}

export async function getDistrictById(provinceId: string| undefined,id: string |undefined){
    if(!id){
        return undefined
    }
    if(!provinceId){
        return undefined
    }

    try {
        const province = await fetcher<IDistrict>(`province/${provinceId}/district/${id}`,{
            method:'GET',
            next: {
                revalidate: FIVEMINUTES
            }
        })
        if(isErrorResponse(province)){
            return undefined
        }
        return province
    } catch (error) {
        return undefined
    }
}


export async function getAddress (){
    try {
        const authCookie = await getAuthCookies();

        const address = await fetcher<IAddress|undefined>('user/address', {
            method: 'GET',
            headers: {
                Cookie: authCookie,
            },
            credentials: 'include',
            next: {
                revalidate: FIVEMINUTES,
                tags: ['address']
            },
        })
        if(isErrorResponse(address)){
            return undefined
        }
        return address
    } catch (error) {
        return undefined
    }
}

export async function getProductById(id: string, userId?:string){
    const query = userId? `product/${id}?userId=${userId}`: `product/${id}`
    
    const product = await fetcher<Product>(query,{
        method: 'GET',
        next:{
            revalidate: FIVEMINUTES,
            tags: [`productDetail/${id}`]
        }
    })
    if(isErrorResponse(product)){
       notFound()
    }
    return product
}

export async function getCategory(){
    const categories  = await fetcher<ICategory[]>('category', {
        method: 'GET',
        next:{
            revalidate: FIVEMINUTES,
            tags: ['categories']
        }
    })
    if(isErrorResponse(categories)){
        return []
    }
    return categories
}

export const getProducts =async (query:string) =>{
    
    const products = await  fetcher<{products: Product[], count: number}>(`product?${query}`, {
      method: 'GET',
      next: {
        revalidate: FIVEMINUTES,
        tags: ['products']
      }
    })
    if(isErrorResponse(products)){
        return {products: [], count: 0}
    }
    return products
  }

 export const getBrands = async () => {
      const brands = await fetcher<{ name: string }[]>('brand?page=1&limit=6', {
          method: 'GET',
          next: {
              revalidate: FIVEMINUTES,
              tags: ['brands']
          },
      });
      if(isErrorResponse(brands)){
        return []
      }
      return brands
  };

 export const getTags = async () => {
      const tags = await fetcher<ITag[]>('tag', {
          method: 'GET',
          next: {
              revalidate: FIVEMINUTES,
              tags: ['tags']
          },
      });
      if(isErrorResponse(tags)){
        return []
      }
      return tags
  };

export async function getFavoriteProducts(query: string){
    const authCookie = await getAuthCookies()
    const products = await  fetcher<{favoriteDetails: IFavoriteDetail[], count: number}>(`user/favorite?${query}`, {
        method: 'GET',
        headers: {
            Cookie: authCookie
        },
        next: {
          revalidate: FIVEMINUTES,
          tags: ['favoriteProducts']
        }
      })
    if(isErrorResponse(products)){
        return {favoriteDetails: [], count: 0}
    }
    return products
}

export async function getOrder (query: string){
    const authCookie = await getAuthCookies()

    const orders = await fetcher<{orders: IOrder[], count: number}>(`user/order?${query}`, {
        method:'GET',
        headers: {
            Cookie: authCookie
        },
        next: {
            revalidate: FIVEMINUTES,
            tags: ['orders']
        }
    })
    if(isErrorResponse(orders)){
        return {orders: [], count: 0}
    }
    return orders

}

export async function getOrderById(id: string){
    const authCookie = await getAuthCookies()
    const order = await fetcher<IOrder>(`user/order/${id}`, {
        method: 'GET',
        headers: {
            Cookie: authCookie
        },
        next: {
            revalidate: FIVEMINUTES,
            tags: [`order-${id}`]
        }
    })
    if(isErrorResponse(order)){
        notFound()
    }
    return order
}

export async function getBrand(){
    const brands = await fetcher<{groupedShop:Record<string, IBrand[] >, count:number}>('brand', {
        method: 'GET',
      
        next: {
            revalidate: FIVEMINUTES,
            tags: ['brands']
        }
    })
    if(isErrorResponse(brands)){
        return {groupedShop: {}, count: 0}
    }
    return brands
}

export async function getAllBrand(){
    const brands = await fetcher<IBrand[]>('brand/all', {
        method: 'GET',
        next: {
            revalidate: FIVEMINUTES,
            tags: ['brands']
        }
    })
    if(isErrorResponse(brands)){
        return []
    }
    return brands
}

export async function getVariant(productId: string, query: string){
    const variant = await fetcher<Varient>(`product/${productId}/varient?${query}`,{
        method: 'GET',
        next: {
            revalidate: 0
        }
    })
    if(isErrorResponse(variant)){
        notFound()
    }
    return variant
}

export async function getProductDetailById(id: string){
    const authCookie = await getAuthCookies()
    const product = await fetcher<Product>(`product/${id}/detail`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Cookie: authCookie
        },
        next: {
            revalidate: FIVEMINUTES,
            tags: [`productDetail/${id}`]
        }
    })
    if(isErrorResponse(product)){
        notFound()
    }
    return product
    
}

export async function pingBE(){
    const data = await fetcher('', {
        method: 'GET',
        cache: 'no-cache'
    })
    return data
}

