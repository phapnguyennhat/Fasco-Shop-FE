import FormUpdateProduct from "./FormUpdateProduct";
import { Metadata } from "next";
import { getCategory } from "@/api/category/query";
import { getTags } from "@/api/tag/query";
import { getAllBrand } from "@/api/shop/query";
import { getProductDetailById } from "@/api/product/query";


export const metadata: Metadata = {
    title: 'Edit Product',
    description: 'Update product',
};

interface IProps {
  params: Promise<{id: string}>
}
export default async function EditProduct({params}: IProps) {
  const {id} = await params

  const [brands, tags, categories, product] = await Promise.all([
      getAllBrand(),
      getTags(),
      getCategory(),
      getProductDetailById(id)
  ]);


  
  return (
      <main className=" w-full pl-4 ">
          <section className="   pl-4 pb-[18px] w-full mb-[30px] border-b  ">
              <h2 className="  text-[#333] text-lg">Update Product</h2>
          </section>

          <section className=" overflow-x-scroll scrollbar-hide    mb-[30px] px-4 ">
              <FormUpdateProduct
                  brands={brands}
                  categories={categories}
                  product={product}
                  tags={tags}
              />
          </section>
      </main>
  );
}
