import { FIVEMINUTES } from '@/app/common/constant';
import getAuthCookies from './getAuthCookie';
import { fetcher } from './utils';

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