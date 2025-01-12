import Link from 'next/link';
import ProductCard from './ProductCard';

export default function NewArrival({ search }: { search?: string }) {
    const images = ['Shiny_Dress.png', 'Long_Dress.png'];
    

    return (
        <section className=" section-page_home">
            <h1 className="font-volkhov mb-[10px] lg:mb-[20px] text-[30px] sm:text-[38px] md:text-[46px] text-center md:leading-[46px] ">
                New Arrivals
            </h1>
            <p className=" text-[#8A8A8A] text-center max-w-[614px] mx-auto ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla,
                labore molestias alias sunt laudantium quaerat nobis inventore
                iure, ea, corporis eligendi vel voluptatem porro nemo. Magni
                nisi laudantium hic quos.
            </p>

            <div className="hidden lg:flex my-[50px] text-[#8A8A8A]  justify-center gap-2 lg:gap-5 items-center">
                <Link
                    className={`${
                        search === "Men's Fashion"
                            ? 'button-black'
                            : 'hover:bg-gray-200  py-2 px-2 lg:px-4 rounded-[10px]'
                    }  inline-flex justify-center items-center max-w-[207px] lg:h-[56px]   transform transition-all duration-300  `}
                    href={"/?search=Men's Fashion"}
                    scroll={false}
                    replace={true}
                >
                    Men's Fashion
                </Link>
                <Link
                    className={`${
                        search === "Women's Fashion"
                            ? 'button-black'
                            : 'hover:bg-gray-200  py-2 px-2 lg:px-4 rounded-[10px]'
                    }  inline-flex justify-center items-center max-w-[207px] lg:h-[56px]  transform transition-all duration-300  `}
                    href={"/?search=Women's Fashion"}
                    scroll={false}
                    replace={true}
                >
                    Women's Fashion
                </Link>
                <Link
                    className={`${
                        search === 'Women Accessories'
                            ? 'button-black'
                            : 'hover:bg-gray-200  py-2 px-2 lg:px-4  rounded-[10px]'
                    }  inline-flex justify-center items-center max-w-[207px] lg:h-[56px]  transform transition-all duration-300   `}
                    href={'/?search=Women Accessories'}
                    scroll={false}
                    replace={true}
                >
                    Women Accessories
                </Link>
                <Link
                    className={`${
                        search === 'Men Accessories'
                            ? 'button-black'
                            : 'hover:bg-gray-200  py-2 px-2 lg:px-4  rounded-[10px]'
                    } inline-flex justify-center items-center max-w-[207px] lg:h-[56px]  transform transition-all duration-300  `}
                    href={'/?search=Men Accessories'}
                    scroll={false}
                    replace={true}
                >
                    Men Accessories
                </Link>
                <Link
                    className={`${
                        search === 'Discount Deals'
                            ? 'button-black'
                            : 'hover:bg-gray-200  py-2 px-2 lg:px-4 rounded-[10px]'
                    }  inline-flex justify-center items-center max-w-[207px] lg:h-[56px]  transform transition-all duration-300  `}
                    href={'/?search=Discount Deals'}
                    scroll={false}
                    replace={true}
                >
                    Discount Deals
                </Link>
            </div>

            {/* TODO: LIST CARD PRODUCT */}
            <div>
                {images.map((image, index) => (
                    <ProductCard key={index} image={image} />
                ))}
            </div>
        </section>
    );
}
