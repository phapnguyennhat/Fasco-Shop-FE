import Link from 'next/link';
import SlideImage from './SlideImage';
import CountDownMonth from './CountDownMonth';

export default function DealsOfMonth() {
    return (
        <section className="    max-w-[1920px] mb-[30px]  sm:mb-[50px]  md:mb-[80px] lg:mb-[150px]  ">
            <div className=" flex ml-4    2xl:ml-[136px] gap-5 ">
                {/* Left Section */}
                <div className="flex  flex-col gap-2 lg:gap-5 w-[444px]">
                    <h2 className=" text-center sm:text-start  xl:text-center text-[25px] lg:text-[30px] lg:leading-[30px] xl:text-[46px] xl:leading-[46px]   font-volkhov ">
                        Deals Of The Month
                    </h2>
                    <p className="text-[#8A8A8A] mb-2 text-base leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Scelerisque duis ultrices sollicitudin aliquam sem.
                        Scelerisque duis ultrices sollicitudin.
                    </p>
                    <Link
                        href="/product?collection=Deals"
                        className=" mb-2 mx-auto sm:mx-0 bg-black min-w-[140px] md:min-w-[180px] lg:min-w-[207px] lg:h-[56px] text-white px-6  py-2 md:py-3 rounded-md text-center font-medium hover:bg-gray-800 transition-all w-max"
                    >
                        Buy Now
                    </Link>
                    <p className=" text-center sm:text-start text-[20px] lg:text-[25px] xl:text-[28px]  font-medium ">
                        Hurry, Before It’s Too Late!
                    </p>
                    {/* Countdown Timer */}
                   <CountDownMonth/>
                </div>

                {/* Right Section */}
                <div className=' hidden md:block'><SlideImage /></div>
            </div>
        </section>
    );
}
