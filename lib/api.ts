import { FIVEMINUTES } from '@/app/common/constant';
import getAuthCookies from './getAuthCookie';
import { fetcher } from './utils';
import { number } from 'zod';

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
        return profile;
    } catch (error) {
        return undefined;
    }
}

export async function getCart() {
    try {
        const authCookie = await getAuthCookies();
        const cartItems: ICartItem[] = await fetcher<ICartItem[]>('cart', {
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
        return cartItems
    } catch (error) {
      return []
    }
}

export async function getProvinces (){
    try{
        const provinces: IProvince[] = await fetcher<IProvince[]>('province', {
            method: 'GET',
            next:{
                revalidate: FIVEMINUTES
            }
        })
        return provinces
    }catch(error) {
        console.log('error')
        return []
    }
}

export async function getProvinceById(id: string|undefined){
    if(!id){
        return undefined
    }
    try {
        const province: IProvince = await fetcher<IProvince>(`province/${id}`,{
            method:'GET',
            next: {
                revalidate: FIVEMINUTES
            }
        })
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
        const province: IDistrict = await fetcher<IDistrict>(`province/${provinceId}/district/${id}`,{
            method:'GET',
            next: {
                revalidate: FIVEMINUTES
            }
        })
        return province
    } catch (error) {
        return undefined
    }
}


export async function getAddress (){
    try {
        const authCookie = await getAuthCookies();

        const address: IAddress|undefined = await fetcher<IAddress|undefined>('user/address', {
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
        return address
    } catch (error) {
        return undefined
    }
}

export async function getProductById(id: string, userId?:string){
    const product: Product = await fetcher<Product>(`product/${id}?userId=${userId}`,{
        method: 'GET',
        next:{
            revalidate: FIVEMINUTES,
            tags: [`productDetail/${id}`]
        }
    })
    return product
}

export async function getCategory(){
    const categories : ICategory[] = await fetcher<ICategory[]>('category', {
        method: 'GET',
        next:{
            revalidate: FIVEMINUTES,
            tags: ['categories']
        }
    })
    return categories
}

export const getProducts = (query:string) =>{
    
    return  fetcher<{products: Product[], count: number}>(`product?${query}`, {
      method: 'GET',
      next: {
        revalidate: FIVEMINUTES,
        tags: ['products']
      }
    })
  }

 export const getBrands = () => {
      return fetcher<{ name: string }[]>('brand?page=1&limit=6', {
          method: 'GET',
          next: {
              revalidate: FIVEMINUTES,
              tags: ['brands']
          },
      });
  };

 export const getTags = () => {
      return fetcher<ITag[]>('tag', {
          method: 'GET',
          next: {
              revalidate: FIVEMINUTES,
              tags: ['tags']
          },
      });
  };

export async function getFavoriteProducts(query: string){
    const authCookie = await getAuthCookies()
    return  fetcher<{favoriteDetails: IFavoriteDetail[], count: number}>(`user/favorite?${query}`, {
        method: 'GET',
        headers: {
            Cookie: authCookie
        },
        next: {
          revalidate: FIVEMINUTES,
          tags: ['favoriteProducts']
        }
      })
}

export async function getOrder (query: string){
    const authCookie = await getAuthCookies()

    return fetcher<{orders: IOrder[], count: number}>(`user/order?${query}`, {
        method:'GET',
        headers: {
            Cookie: authCookie
        },
        next: {
            revalidate: FIVEMINUTES,
            tags: ['orders']
        }
    })

}

export async function getOrderById(id: string){
    const authCookie = await getAuthCookies()
    return fetcher<IOrder>(`user/order/${id}`, {
        method: 'GET',
        headers: {
            Cookie: authCookie
        },
        next: {
            revalidate: FIVEMINUTES,
            tags: [`order-${id}`]
        }
    })
}

export async function getBrand(){
    return fetcher<{groupedShop:Record<string, IBrand[] >, count:number}>('brand', {
        method: 'GET',
      
        next: {
            revalidate: FIVEMINUTES,
            tags: ['brands']
        }
    })
}

export async function getAllBrand(){
    return fetcher<IBrand[]>('brand/all', {
        method: 'GET',
        next: {
            revalidate: FIVEMINUTES,
            tags: ['brands']
        }
    })
}

export async function getVariant(productId: string, query: string){
    return fetcher<Varient>(`product/${productId}/varient?${query}`,{
        method: 'GET',
        next: {
            revalidate: 0
        }
    })
}

