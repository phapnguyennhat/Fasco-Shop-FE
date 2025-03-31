import { ERole } from '@/app/common/enum';
import React from 'react';
import FormCreateProduct from './FormCreateProduct';
import { Metadata } from 'next';
import { logout } from '@/API/auth/action';
import { getProfile } from '@/API/user/query';
import { getCategory } from '@/API/category/query';
import { getTags } from '@/API/tag/query';
import { getAllBrand } from '@/API/shop/query';

export const metadata: Metadata = {
	title: 'Create Product',
	description: 'Creat new Product',
};
export default async function CreateProduct() {
	const user: User | undefined = await getProfile();

	if (user?.role !== ERole.ADMIN) {
		await logout();
	}

	const [brands, tags, categories] = await Promise.all([
		getAllBrand(),
		getTags(),
		getCategory(),
	]);

	return (
		<main className=" w-full pl-4 ">
			<section className="   pl-4 pb-[18px] w-full mb-[30px] border-b  ">
				<h2 className="  text-[#333] text-lg">Create Product</h2>
			</section>

			<section className="    overflow-x-scroll mb-[30px] scrollbar-hide  w-full">
				<FormCreateProduct
					brands={brands}
					categories={categories}
					tags={tags}
				/>
			</section>
		</main>
	);
}
