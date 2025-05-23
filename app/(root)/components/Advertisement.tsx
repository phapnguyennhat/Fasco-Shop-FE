import Image from 'next/image';
import Link from 'next/link';

export default function Advertisement() {
    return (
		<section className=" flex bg-[#DADADA]">
			<Image
				width={1055}
				height={570}
				alt="advertisement"
				src={'/images/advertisement.png'}
				className="hidden md:block w-[55%] h-auto  "
			/>
			<div className=" my-[30px] md:my-[45px] lg:my-[60px] mx-[30px] flex flex-col gap-y-2 md:gap-y-[14px] lg:gap-y-[20px] ">
				<h6 className=" text-[#767676] text-sm lg:text-base ">
					Women Collection
				</h6>
				<h3 className=" text-[28px] leading-[28px] md:text-[30px] md:leading-[30px] lg:text-[46px] lg:leading-[46px] font-volkhov">
					Peaky Blinders
				</h3>
				<span className="underline uppercase text-sm lg:text-base text-black">
					Description
                </span>
                
				<p className="text-[#767676] lg:text-base">
					Step into the world of elegance and empowerment with our
					Women’s Fashion category at Fasco! Designed for the modern
					woman, this collection showcases a stunning array of apparel
					and accessories that blend sophistication with everyday
					comfort. From chic dresses and tailored blazers to versatile
					tops and statement jewelry, we’ve curated pieces that
					celebrate every style and occasion
				</p>

				<div>
					<span className="text-[#767676] text-sm lg:text-base mr-2 lg:mr-[15px]">
						Size
					</span>
					<span className=" button-black">M</span>
				</div>
				<p className="font-medium text-lg  md:text-xl lg:text-[28px] lg:leading-[28px]">
					$100.00
				</p>
				<Link
					href={"/product?categoryName=Women's Fashion"}
					className="mb-2 mx-auto sm:mx-0 bg-black min-w-[140px] md:min-w-[180px] lg:min-w-[207px] lg:h-[56px] text-white px-6  py-2 md:py-3 rounded-md text-center font-medium hover:bg-gray-800 transition-all w-max "
				>
					Buy Now
				</Link>
			</div>
		</section>
	);
}
