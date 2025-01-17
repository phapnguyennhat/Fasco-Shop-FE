import Link from 'next/link';

export default function NewArrival({ categoryName }: { categoryName: string }) {
    
    return (
        <section className=" section-page_home mb-6  md:mb-8 ">
            <h1 className="font-volkhov mb-[10px] lg:mb-[20px]  text-[25px] lg:text-[30px] lg:leading-[30px] xl:text-[46px] text-center xl:leading-[46px] ">
                New Arrivals
            </h1>   
            <p className=" text-[#8A8A8A] text-sm md:text-base text-start md:text-center max-w-[614px] mx-4 md:mx-auto ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla,
                labore molestias alias sunt laudantium quaerat nobis inventore
                iure, ea, corporis eligendi vel voluptatem porro nemo. Magni
                nisi laudantium hic quos.
            </p>

            <div className="hidden lg:flex lg:my-[50px] text-[#8A8A8A]  justify-center gap-2 lg:gap-5 items-center">
                <Link
                    className={`${
                        categoryName === "Men's Fashion"
                            ? 'button-black'
                            : 'hover:bg-gray-200  py-2 px-2 lg:px-4 rounded-[10px]'
                    }  inline-flex justify-center items-center max-w-[207px] lg:h-[56px]   transform transition-all duration-300  `}
                    href={"/?categoryName=Men's Fashion"}
                    scroll={false}
                    replace={true}
                >
                    Men's Fashion
                </Link>
                <Link
                    className={`${
                        categoryName === "Women's Fashion"
                            ? 'button-black'
                            : 'hover:bg-gray-200  py-2 px-2 lg:px-4 rounded-[10px]'
                    }  inline-flex justify-center items-center max-w-[207px] lg:h-[56px]  transform transition-all duration-300  `}
                    href={"/?categoryName=Women's Fashion"}
                    scroll={false}
                    replace={true}
                >
                    Women's Fashion
                </Link>
                <Link
                    className={`${
                        categoryName === 'Women Accessories'
                            ? 'button-black'
                            : 'hover:bg-gray-200  py-2 px-2 lg:px-4  rounded-[10px]'
                    }  inline-flex justify-center items-center max-w-[207px] lg:h-[56px]  transform transition-all duration-300   `}
                    href={'/?categoryName=Women Accessories'}
                    scroll={false}
                    replace={true}
                >
                    Women Accessories
                </Link>
                <Link
                    className={`${
                        categoryName === 'Men Accessories'
                            ? 'button-black'
                            : 'hover:bg-gray-200  py-2 px-2 lg:px-4  rounded-[10px]'
                    } inline-flex justify-center items-center max-w-[207px] lg:h-[56px]  transform transition-all duration-300  `}
                    href={'/?categoryName=Men Accessories'}
                    scroll={false}
                    replace={true}
                >
                    Men Accessories
                </Link>
                <Link
                    className={`${
                        categoryName === 'Discount Deals'
                            ? 'button-black'
                            : 'hover:bg-gray-200  py-2 px-2 lg:px-4 rounded-[10px]'
                    }  inline-flex justify-center items-center max-w-[207px] lg:h-[56px]  transform transition-all duration-300  `}
                    href={'/?categoryName=Discount Deals'}
                    scroll={false}
                    replace={true}
                >
                    Discount Deals
                </Link>
            </div>

            {/* TODO: LIST CARD PRODUCT */}
           
        </section>
    );
}
