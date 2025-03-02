import Image from 'next/image';
import Link from 'next/link';

export default function BannerSale() {
    return (
        <section className="section-page_home relative  mb-[10px]  sm:mb-[20px] lg:mb-[30px]  ">
            <div className="    py-5    flex justify-evenly">
                <div className="   bg-banner h-[756px] items-end ">
                    <Image
                        className=" w-[392px] h-[570px]"
                        src={'/images/banner-sale1.png'}
                        width={392}
                        height={570}
                        alt=" banner sale 1"
                        priority
                    />
                </div>

                {/* TODO: BANNER CENTER */}
                <div className=" flex flex-col items-center ">
                    <div className=" bg-banner w-[426px] h-[150px] ">
                        <Image
                            className=""
                            src={'/images/banner-sale2-1.png'}
                            width={426}
                            height={150}
                            alt=" banner sale 2 1"
                        />
                    </div>

                    <div className=" flex flex-col relative z-10   items-center ">
                        <h2 className=" text-[30px] uppercase font-medium text-black/60 xl:text-inherit md:text-[50px] lg:text-[90px] mt-[36px]  lg:leading-[90px]">
                            Utilmate
                        </h2>
                        <h1 className=" text-[50px] font-medium md:text-[100px] text-transparent md:leading-[100px] lg:text-[187px] uppercase lg:leading-[187px] text-stroke-2  my-3 ">
                            Sale
                        </h1>
                        <h6 className=" sm:text-base  uppercase text-black/60 xl:text-inherit lg:text-[20px] ">
                            New Collection
                        </h6>
                        <Link
                            className=" button-black min-w-[207px] mt-[19px] "
                            href={'/product'}
                        >
                            Shop Now
                        </Link>
                    </div>

                    <div className=" bg-banner mt-[37px]">
                        <Image
                            className=" h-auto w-auto"
                            src={'/images/banner-sale2-2.png'}
                            width={426}
                            height={150}
                            alt=" banner sale 2 1"
                        />
                    </div>
                </div>

                <div className=" bg-banner h-[756px] items-end ">
                    <Image
                        className=" w-[392px] h-[570px]"
                        src={'/images/banner-sale3.png'}
                        width={392}
                        height={570}
                        alt=" banner sale 1"
                    />
                </div>
            </div>

            <Image
                src={'/images/bg-sale-banner.png'}
                alt="Background image"
                className=' block xl:hidden absolute object-cover inset-0'
                fill
                sizes="100vw"

            />
            {/* TODO: ICON */}
        </section>
    );
}
