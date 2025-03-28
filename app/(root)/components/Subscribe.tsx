import { Input } from "@/components/ui/input";
import { submitEmail } from "../../action";
import Image from "next/image";

export default function Subscribe() {
    return (
        <section className=" bg-white ">
          <div className=" lg:max-w-[1400px]   lg:mx-auto flex items-center justify-center pb-[50px] "  >
                <Image src={'/images/subscribe1.png'} width={355} height={747} alt="subscribe image 1" className=" hidden lg:block size-auto" />
               <div>
                    <h2 className="  text-center mb-2 md:mb-4 lg:mb-[14px] xl:mb-[20px] font-volkhov text-xl lg:text-2xl xl:text-[46px] xl:leading-[46px]">
                        Subscribe To Our Newsletter
                    </h2>
                    <p className="ml-5 md:mx-auto md:text-center max-w-[614px] text-[#8A8A8A] text-sm  md:text-base mb-[18px] lg:mb-[20px] xl:mb-[30px]">
                        We will sent notify to you when we release a new product.
                    </p>
                    <form className=" mx-4 flex flex-col items-center "  action={submitEmail}>
                      <Input name="email" className=" mb-[18px] md:mb-[24px] lg:mb-[22px] xl:mb-[30px] max-w-[90%] py-2  " type="email" placeholder="Email" />
                      <button className=" mx-auto button-black  flex justify-center  items-center w-[140px] md:w-[180px] lg:w-[207px]  transition-all duration-300 lg:h-[44px] xl:h-[56px]   " type="submit" >Subcribe Now</button>
                    </form>
               </div>
               <Image src={'/images/subscribe2.png'} width={337} height={747} alt="subscribe image 1" className=" hidden lg:block size-auto" />
          </div>

        </section>
    );
}
