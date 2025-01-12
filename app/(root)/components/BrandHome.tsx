
export default function BrandHome() {
    return (
        <section className=" section-page_home mx-2  py-[30px] sm:py-[50px] lg:py-[82px] ">
            <ul className=' flex items-center gap-5 lg:gap-[70px] justify-center ' >
                <li>
                    <img
                        className="size-auto"
                        src={'/images/chanel-logo.png'}
                        alt="chanel logo"
                    />
                </li>
                <li>
                    <img
                        className="size-auto"
                        src={'/images/louis-vuitton-logo.png'}
                        alt="chanel logo"
                    />
                </li>

                <li>
                    <img
                        className="size-auto"
                        src={'/images/prada-logo.png'}
                        alt="chanel logo"
                    />
                </li>
                <li>
                    <img
                        className="size-auto"
                        src={'/images/calvin-klein-logo.png'}
                        alt="chanel logo"
                    />
                </li>
                <li>
                    <img
                        className="size-auto"
                        src={'/images/denim-logo.png'}
                        alt="chanel logo"
                    />
                </li>
            </ul>
        </section>
    );
}
