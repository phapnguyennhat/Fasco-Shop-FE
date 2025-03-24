import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonProduct() {
    return (
        <section className="  grid grid-cols-1 md:grid-cols-2  gap-x-4 md:gap-[22px] lg:gap-[40px] xl:gap-[65px] section-page_home">
            <div className="   gap-x-[20px] flex gap-[12px]  flex-col    xl:flex-row">
                <ul className=" order-2 xl:order-1   flex flex-row xl:flex-col overflow-y-scroll scrollbar-hide gap-x-2   gap-y-[10px]">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="size-[70px]" />
                    ))}
                </ul>
                <Skeleton className=" size-auto xl:size-[490px] order-1 xl:order-2 border" />
            </div>
            <div>
                <Skeleton className=" w-[10]  mb-[5px] " />
                <h6 className=" flex justify-between mb-2">
                    <Skeleton className=" w-full "></Skeleton>
                </h6>
                <Skeleton className='w-[75px]' />
                <Skeleton className='w-[75px]' />
                
            </div>
        </section>
    );
}
