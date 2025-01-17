import Image from "next/image";

export default function BrandHome() {
    return (
        <section className=" section-page_home mx-2  py-[30px] sm:py-[50px] lg:py-[82px] ">
            <ul className=' flex items-center gap-5 lg:gap-[70px] justify-center ' >
                <li>
                    <Image
                        className="size-auto"
                        src={'/images/chanel-logo.png'}
                        alt="chanel logo"
                        width={396} height={33}

                    />
                </li>
                <li>
                    <Image
                        className="size-auto"
                        src={'/images/louis-vuitton-logo.png'}
                        alt="louis vuitton logo"
                        width={196} height={25}
                    />
                </li>

                <li>
                    <Image
                        className="size-auto"
                        src={'/images/prada-logo.png'}
                        alt="prada logo"
                        width={196} height={32}
                    />
                </li>
                <li>
                    <Image
                        className="size-auto"
                        src={'/images/calvin-klein-logo.png'}
                        alt="calvin klein logo"
                        width={196} height={33}
                    />
                </li>
                <li>
                    <Image
                        className="size-auto"
                        src={'/images/denim-logo.png'}
                        alt="denim logo"
                        width={184} height={27}
                    />
                </li>
            </ul>
        </section>
    );
}
