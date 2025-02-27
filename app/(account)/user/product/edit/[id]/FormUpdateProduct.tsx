'use client';
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
import { ICreateVarient, productSchema } from '../../create/schema';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useMemo } from 'react';
import {
    setNameAttrs,
    setValue,
    setValues,
} from '@/lib/features/attrProduct/attrProductSlice';
import SelectBrand from '../../create/SelectBrand';
import SelectCategory from '../../create/SelectCategory';
import FormCreateAttrImage from '../../create/FormCreateAttrImage';
import { BadgePlus } from 'lucide-react';
import SelectImagesProduct from '../../create/SelectImagesProduct';
import FormCreateAttr from '../../create/FormCreateAttr';
import FormUpdateAttrImage from './FormUpdateAttrImage';
import FormUpdateAttr from './FormUpdateAttr';
import { setVariants } from '@/lib/features/variant/variantSlice';
import { UpdateProduct, updateProductSchema } from './schema';
import TableVarient from './TableVarient';
import UpdateProductImages from './UpdateProductImages';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { updateProduct } from '@/app/action';
import { id } from 'date-fns/locale';

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
    const { attrProducts, varients, tags: productTags, images } = product;

    const form = useForm<UpdateProduct>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            name: product.name,
            categoryName: product.categoryName,
            tags: productTags,
            brandId: product.brandId,
            updateAttrProductDtos: attrProducts.map((attrProduct) => {
                const { id, name, valueAttrs } = attrProduct;
                const updateValueAttrDtos = valueAttrs.map((valueAttr) => ({
                    id: valueAttr.id,
                    value: valueAttr.value,
                }));
                return {
                    id,
                    name,
                    updateValueAttrDtos,
                };
            }),
            updateVarientDtos: varients.map((varient) => {
                const { id, pieceAvail, price, discountPrice, valueAttrs } =
                    varient;
                const valueIds = valueAttrs.map((valueAttr) => valueAttr.id);
                return {
                    id,
                    pieceAvail: pieceAvail.toString(),
                    price: price.toString(),
                    discountPrice: discountPrice?.toString(),
                    valueIds,
                };
            }),
        },
    });

    const updateAttrProductDtos = form.getValues('updateAttrProductDtos');

    const { toast } = useToast();
    const options = useMemo(
        () => tags.map((tag) => ({ value: tag.name, label: tag.name })),
        [tags],
    );

    const dispatch = useDispatch()

    async function onSubmit(values: UpdateProduct) {
       try {
            dispatch(setSpinner(true))

            console.log({id: product.id, values})

            await updateProduct(product.id, values)

            dispatch(setSpinner(false))
            toast({
                description: 'Update product successfully.',
            });

       } catch (error:any) {

            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: error.message,
            });
            dispatch(setSpinner(false))
        
       }
    }

    return (
        <div className="   w-[600px] sm:w-auto justify-evenly   flex ">
            <div className="   md:w-[70%]  mr-4 ">
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
                                            field={field}
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
                                            field={field}
                                        />
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tags"
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
                                                value={field.value.map(
                                                    (item) => ({
                                                        label: item.name,
                                                        value: item.name,
                                                    }),
                                                )}
                                                onChange={(selected) =>
                                                    field.onChange(
                                                        selected.map(
                                                            (item) => ({
                                                                name: item.value,
                                                            }),
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

                        <FormField
                            control={form.control}
                            name="updateAttrProductDtos"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className=" font-normal pt-[20px] ">
                                        <div className=" md:pt-4   mb-[16px] items-center w-full  inline-flex justify-between">
                                            <h6 className=" font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
                                                Attribute Product
                                            </h6>
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <div>
                                            {' '}
                                            {updateAttrProductDtos.map(
                                                (_, indexAttr) =>
                                                    indexAttr === 0 ? (
                                                        <FormUpdateAttrImage
                                                            key={indexAttr}
                                                            indexAttr={
                                                                indexAttr
                                                            }
                                                            field={field}
                                                            attrValues={
                                                                attrProducts[
                                                                    indexAttr
                                                                ].valueAttrs
                                                            }
                                                        />
                                                    ) : (
                                                        <FormUpdateAttr
                                                            key={indexAttr}
                                                            indexAttr={
                                                                indexAttr
                                                            }
                                                            field={field}
                                                        />
                                                    ),
                                            )}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>

                        <FormField
                            control={form.control}
                            name="updateVarientDtos"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className=" font-normal pt-[20px] ">
                                        <div className=" md:pt-4   mb-[16px] items-center w-full  inline-flex justify-between">
                                            <h6 className=" font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
                                                Variants
                                            </h6>
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <TableVarient field={field} updateAttrProductDtos={updateAttrProductDtos} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        ></FormField>

                        <div className=" w-full flex justify-center">
                            <Button className={` px-6 py-4 `} type="submit">
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
           

           <UpdateProductImages images={images} />
        </div>
    );
}
