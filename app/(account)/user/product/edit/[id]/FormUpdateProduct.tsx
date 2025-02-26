'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UpdateProduct } from './schema';
import { ICreateVarient, productSchema } from '../../create/schema';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useMemo } from 'react';
import { setNameAttrs, setValue, setValues } from '@/lib/features/attrProduct/attrProductSlice';
import SelectBrand from '../../create/SelectBrand';
import SelectCategory from '../../create/SelectCategory';
import FormCreateAttrImage from '../../create/FormCreateAttrImage';
import { BadgePlus } from 'lucide-react';
import TableVarient from '../../create/TableVarient';
import SelectImagesProduct from '../../create/SelectImagesProduct';
import FormCreateAttr from '../../create/FormCreateAttr';
import FormUpdateAttrImage from './FormUpdateAttrImage';
import FormUpdateAttr from './FormUpdateAttr';
import { setVariants } from '@/lib/features/variant/variantSlice';



interface IProps {
    brands: IBrand[];
    categories: ICategory[];
    tags: ITag[];
    product: Product;
}
export default function FormUpdateProduct({
    brands,
    categories,
    product,
    tags,
}: IProps) {

  const {attrProducts, varients} = product

    const form  = useForm<UpdateProduct>({
      resolver: zodResolver(productSchema),
      defaultValues: {
        name: product.name,
        brandId: product.brandId,
        categoryName: product.categoryName,
        tagNames: product.tags.map(tag=>(tag.name))
      }
    })

    const dispatch = useDispatch()
    const nameAttrs = useSelector((state: RootState)=>state.attrProduct.value.nameAttrs)

    useEffect(()=>{ 
      const nameAttrs = attrProducts.map(attrProduct=> attrProduct.name)
      const values = attrProducts.map(attr => attr.valueAttrs.map(v => v.value));
      dispatch(setNameAttrs(nameAttrs))
      dispatch(setValues(values))
    },[])
    
    
    const {toast} = useToast()
    const options = useMemo(
        () => tags.map((tag) => ({ value: tag.name, label: tag.name })),
        [tags],
    );

    async function onSubmit (values: UpdateProduct){
    }


    return (
        <div className=" w-[600px] sm:w-auto justify-evenly   flex ">
            <div className="  md:w-[70%] mr-4 ">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-[20px]"
                    >
                        <div className="   items-center w-full  inline-flex justify-between">
                            <h6 className=" font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
                                Info Product
                            </h6>
                        </div>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="grid  grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                                    <FormLabel className=" font-normal pt-[20px] text-right">
                                        Name
                                    </FormLabel>
                                    <div>
                                        <FormControl>
                                            <Input
                                                className=" w-[70%] md:w-full"
                                                autoComplete="off"
                                                placeholder="Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="brandId"
                            render={({ field }) => (
                                <FormItem className="grid  grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                                    <FormLabel className=" font-normal pt-[20px] text-right">
                                        Brand
                                    </FormLabel>
                                    <div>
                                        <FormControl>
                                            <Input
                                                className="  hidden placeholder:text-[#8A8A8A] font-poppins  rounded-none  py-[24px] px-[28px] "
                                                autoComplete="off"
                                                placeholder="Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <SelectBrand
                                            brands={brands}
                                            brandId={form.getValues('brandId')}
                                            form={form}
                                        />
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryName"
                            render={({ field }) => (
                                <FormItem className="grid  grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                                    <FormLabel className=" font-normal pt-[20px] text-right">
                                        Category
                                    </FormLabel>
                                    <div>
                                        <FormControl>
                                            <Input
                                                className="  hidden placeholder:text-[#8A8A8A] font-poppins  rounded-none  py-[24px] px-[28px] "
                                                autoComplete="off"
                                                placeholder="Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <SelectCategory
                                            categories={categories}
                                            categoryName={form.getValues(
                                                'categoryName',
                                            )}
                                            form={form}
                                        />
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tagNames"
                            render={({ field }) => (
                                <FormItem className="grid  grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                                    <FormLabel className=" font-normal pt-[20px] text-right">
                                        Tags
                                    </FormLabel>
                                    <div>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                isMulti
                                                options={options}
                                                instanceId="select-tags" // Giữ nguyên id cho cả server và client
                                                className=" w-[70%] md:w-full basic-multi-select"
                                                classNamePrefix="select"
                                                placeholder="Select tags..."
                                                value={options.filter(
                                                    (option) =>
                                                        field.value.includes(
                                                            option.value,
                                                        ),
                                                )}
                                                onChange={(selected) =>
                                                    field.onChange(
                                                        selected.map(
                                                            (item) =>
                                                                item.value,
                                                        ),
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <div className=" md:pt-4   mb-[16px] items-center w-full  inline-flex justify-between">
                            <h6 className=" font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
                                Attribute Product
                            </h6>
                        </div>

                        {nameAttrs.map((_, indexAttr) =>
                            indexAttr === 0 ? (
                                <FormUpdateAttrImage
                                    key={indexAttr}
                                    indexAttr={indexAttr}
                                    attrProduct={attrProducts[indexAttr]}
                                />
                            ) : (
                                <FormUpdateAttr
                                    key={indexAttr}
                                    indexAttr={indexAttr}
                                    attrProduct={attrProducts[indexAttr]}
                                />
                            ),
                        )}


                        <div className=" w-full flex justify-center">
                            <Button className={` px-6 py-4 `} type="submit">
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            {/* <SelectImagesProduct images={} setImages={[]} /> */}
        </div>
    );
}
