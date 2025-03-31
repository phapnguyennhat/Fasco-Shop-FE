'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { useToast } from '@/hooks/use-toast';
import { useEffect, useMemo, useState } from 'react';

import SelectBrand from './SelectBrand';
import SelectCategory from './SelectCategory';
import Select from 'react-select';
import SelectImagesProduct from './SelectImagesProduct';
import FormCreateAttr from './FormCreateAttr';
import { BadgePlus } from 'lucide-react';
import FormCreateAttrImage from './FormCreateAttrImage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { newAttr, resetAttr } from '@/lib/features/attrProduct/attrProductSlice';
import TableVarient from './TableVarient';
import { resetVariant } from '@/lib/features/variant/variantSlice';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { delay, isErrorResponse } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { createProduct, uploadProductImages } from '@/APIService/product/action';
import { CreateProduct, ICreateAttrProduct, ICreateProduct, ICreateValueAttr, productSchema } from '@/schema/product';

interface IProps {
    brands: IBrand[];
    categories: ICategory[];
    tags: ITag[];
}

export default function FormCreateProduct({
    brands,
    categories,
    tags,
}: IProps) {
    const formProduct = useForm<CreateProduct>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            brandId: '',
            categoryId: '',
            tagIds: []
        },
    });

    useEffect(()=>{
        dispatch(resetAttr())
        dispatch(resetVariant())
    },[])

    const nameAttrs = useSelector((state: RootState)=>state.attrProduct.value.nameAttrs)
    const productValues = useSelector((state: RootState)=>state.attrProduct.value.values)
    const variants = useSelector((state: RootState)=> state.variant.value.variants)

    
    const dispatch  = useDispatch()


    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    
    const options = useMemo(
        () => tags.map((tag) => ({ value: tag.id, label: tag.name })),
        [tags],
    );

    const router = useRouter()


    async function onSubmit(values: CreateProduct) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (images.length === 0) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Images of product went wrong.',
                description: 'Please upload images of product',
            });
            return;
        }


        if(nameAttrs.includes('')){
            toast({
                variant: 'destructive',
                title: 'Uh oh! Name attribute went wrong.',
                description: 'Name attribute is required',
            });
            return;
        }

        const isHasEmptyValue = productValues.some(attrValue => attrValue.includes(''))
        if(isHasEmptyValue){
            toast({
                variant: 'destructive',
                title: 'Uh oh! Values went wrong.',
                description: 'Value is required',
            });
            return;
        }

        if(valueImages.length !== productValues[0].length){
            toast({
                variant: 'destructive',
                title: 'Uh oh! Image of value went wrong.',
                description: 'Image of value is required',
            });
            return;
        }

        const isInvalidVariant = variants.some(item => item.pieceAvail==='' || item.price==='')
        if(isInvalidVariant){
            toast({
                variant: 'destructive',
                title: 'Uh oh! Variants went wrong.',
                description: 'Price and Piece available is required',
            });
            return;
        }

        const attrProducts: ICreateAttrProduct[] = nameAttrs.map((name, index) => {
            const valueAttrs: ICreateValueAttr[] = productValues[index].map(value=>({value}))
            if(index===0){
                return {name, hasImage: true, valueAttrs}
            }else{
                return {name, hasImage: false, valueAttrs}
            }
        })

            setLoading(true);
            dispatch(setSpinner(true))

           const  createProductDto: ICreateProduct = {...values,attrProducts,createVarientDtos: variants }

           const newProduct = await createProduct(createProductDto)
           if (isErrorResponse(newProduct)) {
               setLoading(false);
               dispatch(setSpinner(false));
               toast({
                   variant: 'destructive',
                   title: 'Uh oh! Something went wrong.',
                   description: newProduct.message
               });
               return
           }
           
           const stringValueNames = productValues[0].toString()
           const response = await uploadProductImages(newProduct.id, stringValueNames, images,valueImages)
           if (isErrorResponse(response)) {
               setLoading(false);
               dispatch(setSpinner(false));
               toast({
                   variant: 'destructive',
                   title: 'Uh oh! Something went wrong.',
                   description: response.message,
               });
               return;
           }
            dispatch(resetAttr())
            dispatch(resetVariant())

            setLoading(false);
            dispatch(setSpinner(false))
            toast({
                description: 'Create product successfully.',
            });
            await delay(1000)
            router.push(
                `/product/${encodeURIComponent(newProduct.name)}-i.${newProduct.id}`,
            );
    }

    const [images, setImages] = useState<Blob[]>([]);
    const [valueImages, setValueImages] = useState<Blob[]>([]);


    return (
        <div className=" w-[600px] sm:w-auto justify-evenly   flex ">
            <div className="  md:w-[70%] mr-4 ">
                <Form {...formProduct}>
                    <form
                        onSubmit={formProduct.handleSubmit(onSubmit)}
                        className="space-y-[20px]"
                    >
                        <div className="   items-center w-full  inline-flex justify-between">
                            <h6 className=" font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
                                Info Product
                            </h6>
                        </div>
                        <FormField
                            control={formProduct.control}
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
                            control={formProduct.control}
                            name="brandId"
                            render={({ field }) => (
                                <FormItem className="grid  grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                                    <FormLabel className=" font-normal pt-[20px] text-right">
                                        Brand
                                    </FormLabel>
                                    <div>
                                        <FormControl>
                                            <SelectBrand
                                                brands={brands}
                                                field={field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={formProduct.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem className="grid  grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                                    <FormLabel className=" font-normal pt-[20px] text-right">
                                        Category
                                    </FormLabel>
                                    <div>
                                        <FormControl>
                                            <SelectCategory
                                                categories={categories}
                                                field={field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={formProduct.control}
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

                        <div className=" md:pt-4   mb-[16px] items-center w-full  inline-flex justify-between">
                            <h6 className=" font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
                                Attribute Product
                            </h6>
                        </div>

                        {nameAttrs.map((_, indexAttr) =>
                            indexAttr === 0 ? (
                                <FormCreateAttrImage
                                    key={indexAttr}
                                    indexAttr={indexAttr}
                                    valueImages={valueImages}
                                    setValueImages={setValueImages}
                                />
                            ) : (
                                <FormCreateAttr
                                    key={indexAttr}
                                    indexAttr={indexAttr}
                                />
                            ),
                        )}

                        <div className=" flex justify-center">
                            {' '}
                            <Button
                                disabled={nameAttrs.length === 3}
                                onClick={() => {
                                    dispatch(newAttr());
                                }}
                                className="border hover:text-white border-black bg-white text-black"
                                type="button"
                            >
                                <BadgePlus />
                                New Attribute ({nameAttrs.length}/3)
                            </Button>
                        </div>

                        <TableVarient />

                        <div className=" w-full flex justify-center">
                            <Button
                                disabled={loading}
                                className={` px-6 py-4 ${
                                    loading && 'bg-gray-800'
                                } `}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <SelectImagesProduct images={images} setImages={setImages} />
        </div>
    );
}
