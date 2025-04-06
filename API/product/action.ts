'use server';

import { UpdateProductImage, UpdateValueImage } from '@/app/(account)/user/product/edit/[id]/FormUpdateProduct';
import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';
import { ICreateProduct, UpdateProduct } from '@/schema/product';
import { revalidateTag } from 'next/cache';

export const createProduct = async (createProductDto: ICreateProduct) => {
	const authCookie = await getAuthCookies();

	const newProduct = await fetcher<Product>('product', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Cookie: authCookie,
		},
		body: JSON.stringify(createProductDto),
	});
	if (isErrorResponse(newProduct)) {
		return newProduct;
	}
	revalidateTag('products');
	return newProduct;
};

export const uploadProductImages = async (
	productId: string,
	stringValueNames: string,
	productImages: Blob[],
	valueImages: Blob[],
) => {
	const formData = new FormData();
	formData.append('stringValueNames', stringValueNames);
	productImages.forEach((file) => {
		formData.append('productImages', file);
	});

	valueImages.forEach((file) => {
		formData.append('valueImages', file);
	});

	const authCookie = await getAuthCookies();
	const response = await fetcher(`product/${productId}/image`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			Cookie: authCookie,
		},
		body: formData,
	});
	if (isErrorResponse(response)) {
		return response;
	}
	revalidateTag(`productDetail/${productId}`);
};


export  const deleteProduct = async(id :string)=>{
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

export const updateProduct = async(id: string, updateProductDto: UpdateProduct)=>{
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

export const reloadProduct = async()=>{
	revalidateTag('products')
}
