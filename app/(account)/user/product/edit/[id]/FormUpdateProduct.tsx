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
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { useCallback, useEffect, useMemo, useState } from 'react';

import SelectBrand from '../../create/SelectBrand';
import SelectCategory from '../../create/SelectCategory';
import FormUpdateAttrImage from './FormUpdateAttrImage';
import FormUpdateAttr from './FormUpdateAttr';
import TableVarient from './TableVarient';
import UpdateProductImages from './UpdateProductImages';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { cartesian, isErrorResponse } from '@/lib/utils';
import { updateProduct, updateProductImages } from '@/api/product/action';
import { UpdateProduct, updateProductSchema } from '@/schema/product';

export interface UpdateValueImage {
    id: string;
    url: string;
    file: Blob | null;
}

export interface UpdateProductImage {
    id?: string;
    url: string;
    file: Blob | null;
    isDelete: boolean
}

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

    const cartesianValues: IValueAttr[][] = useMemo(() => {
        const values = attrProducts.map((item) =>
            item.valueAttrs.map((updateValue) => ({
                value: updateValue.value,
                id: updateValue.id,
            })),
        );
        return cartesian(values);
    }, []);

    const form = useForm<UpdateProduct>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            name: product.name,
            categoryId: product.category?.id ||'',
            tagIds: productTags.map(tag=>tag.id),
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
            updateVarientDtos: cartesianValues.map((item) => {
                const foundVarient = varients.find((varient) =>
                    item.every((value) =>
                        varient.valueAttrs.some(
                            (vAttr) => vAttr.id === value.id,
                        ),
                    ),
                );

                if (!foundVarient) {
                    return;
                }

                return {
                    id: foundVarient.id,
                    pieceAvail: foundVarient.pieceAvail.toString(),
                    price: foundVarient.price.toString(),
                    discountPrice:
                        foundVarient.discountPrice?.toString() || undefined,
                };
            }),
        },
    });

    const [valueImages, setValueImages] = useState<UpdateValueImage[]>(() => {
        return attrProducts[0].valueAttrs.map((item) => ({
            id: item.id,
            url: item.image.url,
            file: null,
        }));
    });

    

    const handleChangeValueImage = useCallback(
        (index: number, file: Blob) => {
            const newValueImages = [...valueImages];
            const valueImage = newValueImages[index];
            newValueImages[index] = {
                ...valueImage,
                file,
                url: URL.createObjectURL(file),
            };
            setValueImages(newValueImages);
        },
        [valueImages],
    );

    const [productImages, setProductImages] = useState<UpdateProductImage[]>(
        () => {
            return images.map((image) => ({
                id: image.id,
                url: image.url,
                file: null,
                isDelete: false
            }));
        },
    );

    useEffect(() => {
        setProductImages(
            images.map((image) => ({
                id: image.id,
                url: image.url,
                file: null,
                isDelete: false,
            })),
        );
    }, [images]);

    const updateAttrProductDtos = form.getValues('updateAttrProductDtos');

    const { toast } = useToast();
    const options = useMemo(
        () => tags.map((tag) => ({ value: tag.id, label: tag.name })),
        [tags],
    );

    const dispatch = useDispatch();

    async function onSubmit(values: UpdateProduct) {
        const showProductImages = productImages.filter(item =>! item.isDelete)
        if(showProductImages.length>10){
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: "Maxinum 10 images of product",
            });
            return 
        }
        try {
            dispatch(setSpinner(true));

            const response =await updateProduct(product.id, values);
            if(isErrorResponse(response)){
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: response.message,
                });
                dispatch(setSpinner(false));
                return;
            }
            if(valueImages.length !==0 || productImages.length !==0){
                const response = await updateProductImages(product.id, valueImages, productImages)

                if(isErrorResponse(response)){
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong.',
                        description: response.message,
                    });
                    dispatch(setSpinner(false))
                    return
                }
            }

            dispatch(setSpinner(false));
            toast({
                description: 'Update product successfully.',
            });
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: error.message,
            });
            dispatch(setSpinner(false));
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
                            name="categoryId"
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
                            name="tagIds"
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
                                                value={options.filter(item => field.value.includes(item.value))}
                                                onChange={(selected) =>
                                                    field.onChange(
                                                        selected.map(item =>item.value)
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
                                                            valueImages={
                                                                valueImages
                                                            }
                                                            handleChangeValueImage={
                                                                handleChangeValueImage
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
                                        <TableVarient
                                            field={field}
                                            updateAttrProductDtos={
                                                updateAttrProductDtos
                                            }
                                        />
                                    </FormControl>
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

            <UpdateProductImages
                productImages={productImages}
               setProductImages={setProductImages}
            />
        </div>
    );
}
