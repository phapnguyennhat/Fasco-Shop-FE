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
import { CreateProduct, productSchema } from './schema';
import { useToast } from '@/hooks/use-toast';
import { useMemo, useState } from 'react';
import { createProduct } from '@/app/action';
import SelectBrand from './SelectBrand';
import SelectCategory from './SelectCategory';
import Select from 'react-select';
import SelectImagesProduct from './SelectImagesProduct';
import FormCreateAttr from './FormCreateAttr';
import { BadgePlus } from 'lucide-react';
import FormCreateAttrImage from './FormCreateAttrImage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { newAttr } from '@/lib/features/attrProduct/attrProductSlice';
import TableVarient from './TableVarient';

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
            categoryName: '',
            tagNames: [],
        },
    });

    const nameAttrs = useSelector((state: RootState)=>state.attrProduct.value.nameAttrs)

    const dispatch  = useDispatch()


    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    


    const options = useMemo(
        () => tags.map((tag) => ({ value: tag.name, label: tag.name })),
        [tags],
    );

    async function onSubmit(values: CreateProduct) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (images.length === 0) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'Images of product is required',
            });
            return;
        }
        try {
            setLoading(true);
            // await createProduct(values);
            setLoading(false);
            toast({
                description: 'Create product successfully.',
            });
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: error.message,
            });
            setLoading(false);
        }
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
                                            <Input
                                                className="  hidden placeholder:text-[#8A8A8A] font-poppins  rounded-none  py-[24px] px-[28px] "
                                                autoComplete="off"
                                                placeholder="Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <SelectBrand
                                            brands={brands}
                                            brandId={formProduct.getValues(
                                                'brandId',
                                            )}
                                            form={formProduct}
                                        />
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={formProduct.control}
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
                                            categoryName={formProduct.getValues(
                                                'categoryName',
                                            )}
                                            form={formProduct}
                                        />
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={formProduct.control}
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
                                                className="basic-multi-select"
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

                        <div className="   mb-[16px] items-center w-full  inline-flex justify-between">
                            <h6 className=" font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
                                Attribute Product
                            </h6>
                        </div>

                        {nameAttrs.map((_, indexAttr) =>
                            indexAttr === 0 ? (
                                <FormCreateAttrImage key={ indexAttr} indexAttr={indexAttr} valueImages={valueImages} setValueImages={setValueImages} />
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
                                disabled = {nameAttrs.length ===3}
                                onClick={() => {
                                    dispatch(newAttr())
                                }}
                                className="border hover:text-white border-black bg-white text-black"
                                type="button"
                            >
                                <BadgePlus />
                                New Attribute ({nameAttrs.length}/3)
                            </Button>
                        </div>

                        <TableVarient/>

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
