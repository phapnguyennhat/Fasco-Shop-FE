import Link from "next/link";

export default function Footer() {
    const items = [
        'Support Center',
        'Invoicing',
        'Contract',
        'Careers',
        'Blog',
        'FAQs',
    ];

    return (
        <>
            <div className=" border-b-2" />
            <footer className=" bg-white mt-[16px]   lg:pt-[30px] mb-[12px] md:mb-[18px] lg:mb-[23px] ">
                <section className=" section-page_home gap-[20px] md:gap-[38px] lg:gap-[50px] flex flex-col items-center">
                    <div className="  flex w-full flex-col lg:flex-row items-center md:gap-5    md:justify-between">
                        <span className=" text-2xl md:text-[32px] lg:text-[32px]  font-volkhov lg:mr-5 ">
                            Fasco
                        </span>
                        <ul className=" grid grid-cols-3 md:flex gap-x-[18px] md:gap-[26px] lg:gap-[38px]">
                            {items.map((item) => (
                                <li
                                    className=" text-sm hover:text-gray-400 hover:scale-110 transition-all duration-500"
                                    key={item}
                                >
                                   <Link href={'#'}> {item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className=" text-xs">
                        Copyright © 2022 Xpro . All Rights Reseved.
                    </p>
                </section>
            </footer>
        </>
    );
}
