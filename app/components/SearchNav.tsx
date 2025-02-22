import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function SearchNav() {
    const searchParams = useSearchParams()
    const keyword = searchParams.get('keyword')
    return (
        <li className=" border-2 rounded-[8px] shadow-sm">
            <form onSubmit={()=>{}}  action={'/product'} className="     flex">
                <input
                    defaultValue={keyword||''}
                    placeholder="Keyword"
                    className=" focus:outline-none max-w-[130px] md:max-w-[230px] px-2  "
                    type="text"
                    name="keyword"
                    autoComplete='off'
                />
                <Button className=" bg-white shadow-none hover:bg-white hover:scale-105 transition-all duration-300 ">
                    <Image
                        src={'/icons/search.png'}
                        width={18}
                        height={18}
                        className="size-[18px]"
                        alt="search icon"
                    />
                </Button>
            </form>
        </li>
    );
}
