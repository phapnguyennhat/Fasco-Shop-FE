'use server';

import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher } from '@/lib/utils';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CreateAddress } from './(root)/checkout/schema';
import { UpdateProfile } from './(account)/user/profile/schema';
import { File } from 'buffer';
import { UpdatePassword } from './(account)/user/password/schema';
import { string } from 'zod';
import { CreateProduct, ICreateProduct } from './(account)/user/product/create/schema';
import { EStatusOrder } from './common/enum';
import { UpdateProduct } from './(account)/user/product/edit/[id]/schema';
import { UpdateProductImage, UpdateValueImage } from './(account)/user/product/edit/[id]/FormUpdateProduct';

export const submitEmail = async (formData: FormData) => {
    const email = formData.get('email');
    // TODO: Call api to subscribe email
};

export async function login(body: { account: string; password: string }) {
    const token = await fetcher<LoginToken>('auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const cookieStore = await cookies();
    cookieStore.set('Authentication', token.accessTokenCookie.token, {
        httpOnly: true,
        path: '/',
        maxAge: token.accessTokenCookie.accessTime,
    });
    cookieStore.set('Refresh', token.refreshTokenCookie.token, {
        httpOnly: true,
        path: '/',
        maxAge: token.refreshTokenCookie.accessTime,
    });
    redirect('/');
}

export async function googleLogin(credential: string) {
    const token = await fetcher<LoginToken>('google-auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
    });
    const cookieStore = await cookies();
    cookieStore.set('Authentication', token.accessTokenCookie.token, {
        httpOnly: true,
        path: '/',
        maxAge: token.accessTokenCookie.accessTime,
    });
    cookieStore.set('Refresh', token.refreshTokenCookie.token, {
        httpOnly: true,
        path: '/',
        maxAge: token.refreshTokenCookie.accessTime,
    });
    redirect('/');
}

export async function loginFacebook(credential: string) {
    const token = await fetcher<LoginToken>('facebook-auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
    });
    const cookieStore = await cookies();
    cookieStore.set('Authentication', token.accessTokenCookie.token, {
        httpOnly: true,
        path: '/',
        maxAge: token.accessTokenCookie.accessTime,
    });
    cookieStore.set('Refresh', token.refreshTokenCookie.token, {
        httpOnly: true,
        path: '/',
        maxAge: token.refreshTokenCookie.accessTime,
    });
    redirect('/');
}

export async function logout() {
    const authCookie = await getAuthCookies();
    const response = fetch(`${process.env.BACKEND_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Cookie: authCookie,
        },
    });
    const cookieStore = await cookies();
    cookieStore.delete('Authentication');
    cookieStore.delete('Refresh');
    redirect('/login');
}

export async function addCart(formData: FormData) {
    const quantity = formData.get('quantity');
    const varientId = formData.get('varientId');
    const authCookie = await getAuthCookies();

    await fetcher('cart', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },

        body: JSON.stringify({ quantity, varientId }),
    });

    revalidateTag('cartItem');
}

export async function updateCartItem(id: string, quantity: number) {
    const authCookie = await getAuthCookies();

    await fetcher(`cart/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },

        body: JSON.stringify({ quantity }),
    });
    revalidateTag('cartItem');
}

export async function deleteCartItem(id: string) {
    const authCookie = await getAuthCookies();
    await fetcher(`cart/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },
    });
    revalidateTag('cartItem');
}

export async function createOrder(
    createAddress: CreateAddress,
    isWrap: boolean,
) {
    const authCookie = await getAuthCookies();
    await fetcher(`user/order`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },
        body: JSON.stringify( {address: createAddress,isWrap})
    });
    revalidateTag('cartItem');
    revalidateTag('orders')
    revalidateTag('favoriteProducts')
    redirect('/user/purchase')
    
}

export async function createAddress (createAddress: CreateAddress){
    try {
        const authCookie= await getAuthCookies()
        await fetcher('user/address', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Cookie: authCookie,
            },
            body: JSON.stringify(createAddress),
        });
        revalidateTag('address')
    } catch (error) {
        
    }
}

export async function updateProfile (updateProfile: UpdateProfile){
        const authCookie = await getAuthCookies()
        await fetcher('user', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Cookie: authCookie,
            },
            body: JSON.stringify(updateProfile),
        });
        revalidateTag('profile')
}

export async function updateAvatar(file: Blob){
    const formData = new FormData();
    formData.append('file', file )

    const authCookie = await getAuthCookies()
    await fetcher('user/avatar', {
        method: 'PUT',
        credentials: 'include',
            headers: {
               
                Cookie: authCookie,
            },
            body: formData
    })
    revalidateTag('profile')
}

export async function createFavorite (productId: string){
    const authCookie = await getAuthCookies()
    await fetcher(`user/favorite/${productId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Cookie: authCookie,
        },
    })
    revalidateTag(`productDetail/${productId}`)
    revalidateTag('favoriteProducts')
}

export async function deleteFavoriteAbulk(productIds: string[]) {
    const authCookie = await getAuthCookies();
    await fetcher('user/favorite', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },
        body: JSON.stringify({ productIds }),
    });

    productIds.forEach((productId) => {
        revalidateTag(`productDetail/${productId}`);
    });
    revalidateTag('favoriteProducts')
}

export async function changePassword(updatePassword: UpdatePassword){
    const authCookie = await getAuthCookies()
    await fetcher('auth/change-password', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },
        body: JSON.stringify(updatePassword),
    })
}

export async function updateStatusOrder(orderId: string, status: EStatusOrder){
    const authCookie = await getAuthCookies()
    await fetcher(`user/order/${orderId}/${status}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            Cookie: authCookie
        },
    })
    revalidateTag('orders')
    revalidateTag(`order-${orderId}`)
}

export async function updateAddressOrder(orderId: string, addressId: string, updateAddress: CreateAddress)
{
    const authCookie = await getAuthCookies()
    await fetcher(`user/order/${orderId}/address/${addressId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie
        },
        body: JSON.stringify(updateAddress),

    })
    revalidateTag(`order-${orderId}`)
}


export async function createProduct (createProductDto: ICreateProduct){
    const authCookie =await getAuthCookies()

    const newProduct = await fetcher<Product>('product', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie
        },
        body: JSON.stringify(createProductDto)
    })

    revalidateTag('products')
    return newProduct
}


export async function uploadProductImages (productId: string,stringValueNames: string, productImages: Blob[], valueImages: Blob[]){
    const formData = new FormData()
    formData.append('stringValueNames', stringValueNames)
    productImages.forEach(file=>{
        formData.append('productImages', file)
    })

    valueImages.forEach(file=>{
        formData.append('valueImages', file)
    })

    const authCookie = await getAuthCookies()
    await fetcher(`product/${productId}/image`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            Cookie: authCookie
        },
        body: formData
    })
    revalidateTag(`productDetail/${productId}`)
}


export async function createShop(file:Blob, name: string) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('file', file)

   const authCookie =await getAuthCookies()
    await fetcher('brand', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Cookie: authCookie
        },
        body: formData
    })
    revalidateTag('brands')
}

export async function deleteShop(id:string) {
    const authCookie = await getAuthCookies()

   await fetcher(`brand/${id}`, {
       method: 'DELETE',
       credentials: 'include',
       headers: {
           Cookie: authCookie,
       },
   });

    revalidateTag('brands')
}

export async function updateShop (id: string, name: string, file?: Blob){
    const formData = new FormData()
    formData.append('name', name)
    if(file){
        formData.append('file', file)
    }

    const authCookie= await getAuthCookies()

    await fetcher(`brand/${id}`,{
        method: 'PUT',
        credentials: 'include',
        headers: {
            Cookie: authCookie
        },
        body: formData
    })

    revalidateTag('brands')
}

export async function createCategory (name: string){
    const authCookie = await getAuthCookies()

    await fetcher('category', {
        method:'POST',
        credentials: 'include',
        headers: {
            Cookie: authCookie,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name})
    })
    revalidateTag('categories')
}

export async function createTag (name: string){
    const authCookie = await getAuthCookies()

    await fetcher('tag',{
        method:'POST',
        credentials: 'include',
        headers: {
            Cookie: authCookie,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name})
    })

    revalidateTag('tags')
}


export async function deleteProduct(id :string){
    const authCookie =await getAuthCookies()

    await fetcher(`product/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            Cookie: authCookie,
        }
    })

    revalidateTag('products')
    revalidateTag('favoriteProducts')
}

export async function updateProduct(id: string, updateProductDto: UpdateProduct){
    const authCookie = await getAuthCookies()
    await fetcher(`product/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            Cookie: authCookie,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProductDto)
    })
    revalidateTag('products')
    revalidateTag(`productDetail/${id}`)
}

export async function updateProductImages(
    productId: string,
    valueImages: UpdateValueImage[],
    productImages: UpdateProductImage[],
) {

    const formData = new FormData()
    const valueIds: string[] = []
    valueImages.forEach((valueImage) => {
        if(!valueImage.file){
            return;
        }
        else{
            formData.append('valueImages', valueImage.file);
            valueIds.push(valueImage.id)
        }
        
    });
    
    const stringValueIds = valueIds.join(',')
    const updateImageIds: string[] = []
    const deleteImageIds: string[] = []
    productImages.forEach((productImage) => {
        if (!productImage.file) {
            if (productImage.isDelete && productImage.id) {
                deleteImageIds.push(productImage.id);
            }
        } else {
            formData.append('productImages', productImage.file);
            if (productImage.isDelete && productImage.id ) {
                deleteImageIds.push(productImage.id);
            } else if (!productImage.isDelete && productImage.id) {
                updateImageIds.push(productImage.id);
            }
        }
    });
    const stringUpdateImageIds = updateImageIds.join(',')
    const stringDeleteImageIds = deleteImageIds.join(',')

    if (stringUpdateImageIds !== '') {
        formData.append('stringUpdateImageIds', stringUpdateImageIds);
    }
    if (stringDeleteImageIds !== '') {
        formData.append('stringDeleteImageIds', stringDeleteImageIds);
    }
    if (stringValueIds !== '') {
        formData.append('stringValueIds', stringValueIds);
    }

    const authCookie = await getAuthCookies()

    await fetcher(`product/${productId}/image`, {
        method:'PUT',
        headers: {
            Cookie: authCookie
        },
        body: formData
    })
    revalidateTag('products')
    revalidateTag(`productDetail/${productId}`)
}
