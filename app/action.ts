'use server';

import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';
import { CreateAddress } from './(root)/checkout/schema';
import { UpdateProfile } from './(account)/user/profile/schema';
import { File } from 'buffer';
import { UpdatePassword } from './(account)/user/password/schema';
import { string } from 'zod';
import { CreateProduct, ICreateProduct } from './(account)/user/product/create/schema';
import { EStatusOrder } from './common/enum';
import { UpdateProduct } from './(account)/user/product/edit/[id]/schema';
import { UpdateProductImage, UpdateValueImage } from './(account)/user/product/edit/[id]/FormUpdateProduct';
import { CreateAccount } from './(auth)/register/register.form';

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

    if(isErrorResponse(token)){
        return token
    }

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
    // redirect("/")
}

export async function register(values: CreateAccount){
    const body = {
        name: values.lastName +' '+ values.firstName,
        username: values.username,
        password: values.password,
        email: values.email
    }
    const responseRegister = await fetcher<IResponse>('auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    if(isErrorResponse(responseRegister)){
        return responseRegister
    }

    const responseLogin =await login({account: values.username, password: values.password})
    if(isErrorResponse(responseLogin)){
        return responseLogin
    }
}

export async function googleLogin(credential: string) {
    const token = await fetcher<LoginToken>('google-auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
    });

    if(isErrorResponse(token)){
        return token
    }


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

    if(isErrorResponse(token)){
        return token
    }

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

    const response = await fetcher<IResponse>('cart', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },

        body: JSON.stringify({ quantity, varientId }),
    });
    if(isErrorResponse(response)){
        return response
    }
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
    const response = await fetcher<IResponse>(`user/order`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },
        body: JSON.stringify( {address: createAddress,isWrap})
    });
    if(isErrorResponse(response)){
        return response
    }
    revalidateTag('cartItem');
    revalidateTag('orders')
    revalidateTag('favoriteProducts')
    redirect('/user/purchase')
    
}

export async function createAddress(createAddress: CreateAddress) {
    const authCookie = await getAuthCookies();
    const response = await fetcher<IResponse>('user/address', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },
        body: JSON.stringify(createAddress),
    });
    if (isErrorResponse(response)) {
        return response;
    }
    revalidateTag('address');
}

export async function updateProfile (updateProfile: UpdateProfile){
        const authCookie = await getAuthCookies()
        const response = await fetcher<IResponse>('user', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Cookie: authCookie,
            },
            body: JSON.stringify(updateProfile),
        });
        if(isErrorResponse(response)){
            return response
        }
        revalidateTag('profile')
}

export async function updateAvatar(file: Blob){
    const formData = new FormData();
    formData.append('file', file )

    const authCookie = await getAuthCookies()
    const response=  await fetcher<IResponse>('user/avatar', {
        method: 'PUT',
        credentials: 'include',
            headers: {
               
                Cookie: authCookie,
            },
            body: formData
    })
    if(isErrorResponse(response)){
        return response
    }
    revalidateTag('profile')
}

export async function createFavorite (productId: string){
    const authCookie = await getAuthCookies()
    const response =await fetcher<IResponse>(`user/favorite/${productId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Cookie: authCookie,
        },
    })
    if(isErrorResponse(response)){
        return response
    }
    revalidateTag(`productDetail/${productId}`)
    revalidateTag('favoriteProducts')
}

export async function deleteFavoriteAbulk(productIds: string[]) {
    const authCookie = await getAuthCookies();
    const response =  await fetcher<IResponse>('user/favorite', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },
        body: JSON.stringify({ productIds }),
    });
    if(isErrorResponse(response)){
        return response
    }

    productIds.forEach((productId) => {
        revalidateTag(`productDetail/${productId}`);
    });
    revalidateTag('favoriteProducts')
}

export async function changePassword(updatePassword: UpdatePassword){
    const authCookie = await getAuthCookies()
    const response = await fetcher<IResponse>('auth/change-password', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },
        body: JSON.stringify(updatePassword),
    })
    return response
}

export async function updateStatusOrder(orderId: string, status: EStatusOrder){
    const authCookie = await getAuthCookies()
    const response = await fetcher(`user/order/${orderId}/${status}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            Cookie: authCookie
        },
    })
    if(isErrorResponse(response)){
        return response
    }
    revalidateTag('orders')
    revalidateTag(`order-${orderId}`)
}

export async function updateAddressOrder(orderId: string, addressId: string, updateAddress: CreateAddress)
{
    const authCookie = await getAuthCookies()
    const response =await fetcher<IResponse>(`user/order/${orderId}/address/${addressId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie
        },
        body: JSON.stringify(updateAddress),

    })
    if(isErrorResponse(response)){
        return response
    }
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
    if(isErrorResponse(newProduct)){
        return newProduct
    }
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
    const response =await fetcher(`product/${productId}/image`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            Cookie: authCookie
        },
        body: formData
    })
    if(isErrorResponse(response)){
        return response
    }
    revalidateTag(`productDetail/${productId}`)
}


export async function createShop(file:Blob, name: string) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('file', file)

   const authCookie =await getAuthCookies()
    const response = await fetcher('brand', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Cookie: authCookie
        },
        body: formData
    })
    if(isErrorResponse(response)){
        return response
    }
    revalidateTag('brands')
}

export async function deleteShop(id:string) {
    const authCookie = await getAuthCookies()

   const response =await fetcher(`brand/${id}`, {
       method: 'DELETE',
       credentials: 'include',
       headers: {
           Cookie: authCookie,
       },
   });
   if(!isErrorResponse(response)){
       revalidateTag('brands')
    }
    return response
}

export async function updateShop (id: string, name: string, file?: Blob){
    const formData = new FormData()
    formData.append('name', name)
    if(file){
        formData.append('file', file)
    }

    const authCookie= await getAuthCookies()

    const response = await fetcher(`brand/${id}`,{
        method: 'PUT',
        credentials: 'include',
        headers: {
            Cookie: authCookie
        },
        body: formData
    })

    if(isErrorResponse(response)){
        return response

    }
    revalidateTag('brands')
}

export async function createCategory (name: string){
    const authCookie = await getAuthCookies()

    const response =await fetcher('category', {
        method:'POST',
        credentials: 'include',
        headers: {
            Cookie: authCookie,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name})
    })
    if(isErrorResponse(response)){
        return response
    }
    revalidateTag('categories')
}

export async function createTag (name: string){
    const authCookie = await getAuthCookies()

    const response = await fetcher('tag',{
        method:'POST',
        credentials: 'include',
        headers: {
            Cookie: authCookie,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name})
    })
    if(isErrorResponse(response)){
        return response
    }
    revalidateTag('tags')
}


export async function deleteProduct(id :string){
    const authCookie =await getAuthCookies()

    const response = await fetcher(`product/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            Cookie: authCookie,
        }
    })

    if(!isErrorResponse(response)){
        revalidateTag('products')
        revalidateTag('favoriteProducts')
    }
    return response
}

export async function updateProduct(id: string, updateProductDto: UpdateProduct){
    const authCookie = await getAuthCookies()
    const response = await fetcher(`product/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            Cookie: authCookie,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProductDto)
    })
    if(isErrorResponse(response)){
        return response
    }
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

    const response =await fetcher(`product/${productId}/image`, {
        method:'PUT',
        headers: {
            Cookie: authCookie
        },
        body: formData
    })
    if(isErrorResponse(response)){
        return response
    }
    revalidateTag('products')
    revalidateTag(`productDetail/${productId}`)
}

export async function sendCodeResetPassword(body: {email: string}){
    const response = await fetcher('auth/resetPassword/code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if(isErrorResponse(response)){
        return response
    }
    const cookieStore = await cookies();
    cookieStore.set('Email', body.email, {
        httpOnly: true,
        path: '/',
        maxAge: 300,
    });
    redirect('/forget/code')
}

export async function confirmCode (email: string, code: string){
    const response =await  fetcher<Token>('auth/resetPassword/confirm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, code})
    })
    
    if(isErrorResponse(response)){
        return response
    }
    const {token, accessTime} = response

    const cookieStore = await cookies();
    cookieStore.delete('Email')

    cookieStore.set('ResetPassword', token, {
        httpOnly: true,
        path: '/',
        maxAge: accessTime,
    });
    redirect('/forget/password')
}

export async function resetPassword (password: string){
    const cookieStore = await cookies()
    const resetPasswordCookie = cookieStore.get('ResetPassword')
    if(!resetPasswordCookie){
        throw new Error('have not token reset password')
    }
    const {name, value} = resetPasswordCookie

    const cookie = `${name}=${value}`
    
    const response =await fetcher('auth/resetPassword',{
        method: 'POST',
        headers: {
            Cookie: cookie,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password})
    })
    if(isErrorResponse(response)){
        return response
    }
    cookieStore.delete('ResetPassword')

    // redirect('/login')
}

export async function deleteCategory(id: string){
    const authCookie = await getAuthCookies()
    const response = await fetcher(`category/${id}`,{
        method:'DELETE',
        headers: {
            Cookie: authCookie
        }
    })
    if(isErrorResponse(response)){
        return response
    }
    revalidateTag('categories')
    return response
}

export async function updateCategory (id: string, name: string){
    const authCookie = await getAuthCookies()
    const response = await fetcher(`category/${id}`, {
        method: 'PUT',
        headers: {
            Cookie: authCookie,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    })
    
    if(!isErrorResponse(response)){
        revalidateTag('categories')
    }
    return response
    
}

export async function updateTag(tagId: string, name: string) {
    const authCookie = await getAuthCookies()
    const response = await fetcher(`tag/${tagId}`, {
        method: 'PUT',
        headers: {
            Cookie: authCookie,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    })

    if(!isErrorResponse(response)){
        revalidateTag('tags')
    }
    return response
}

export async function deleteTag(tagId: string){
    const authCookie = await getAuthCookies()
    const response = await fetcher(`tag/${tagId}`, {
        method: 'DELETE',
        headers: {
            Cookie: authCookie,
            
        },
       
    })
    if(!isErrorResponse(response)){
        revalidateTag('tags')
    }
    return response
}
