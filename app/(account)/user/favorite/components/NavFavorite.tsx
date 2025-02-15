  import Link from 'next/link';
  import NavStatus from './NavStatus';
  import NavCategory from './NavCategory';
  import { createQueryString, isEmptyObject, SearchParams } from '@/lib/utils';

  interface IProps {
      searchParams: Promise<SearchParams>;
  }

  export default async function NavFavorite({ searchParams }: IProps) {
      const queryParams = await searchParams;
      const discount = JSON.parse(queryParams['discount'] as string || 'false')
      return (
          <nav>
              <ul className="   mb-[40px] items-center flex justify-center  gap-x-2  md:gap-x-3">
                  <li className=" md:min-w-[130px]">
                      <Link
                          className={`  px-2 md:w-[130px] rounded-[10px] h-[36px] md:h-[42px] lg:h-[56px] inline-flex justify-center items-center ${
                              isEmptyObject(queryParams)
                                  ? 'bg-black text-white'
                                  : 'bg-gray-200'
                          } text-black transition-all duration-500 hover:bg-black hover:text-white `}
                          href={'?'}
                          scroll={false}
                          replace={true}
                      >
                          All
                      </Link>
                  </li>

                  <NavStatus queryParams={queryParams} />

                  <li className=" md:min-w-[130px]">
                      <Link
                           className={`md:w-[130px] hover:bg-black hover:text-white transition-all duration-500 px-2 rounded-[10px] h-[36px] md:h-[42px] lg:h-[56px] inline-flex justify-center items-center ${
                            discount
                                ? 'bg-black text-white'
                                : 'bg-gray-200'
                        } text-black`}
                          href={`?${createQueryString('discount', 'true', queryParams)}`}
                          scroll={false}
                          replace={true}
                      >
                          Discount
                      </Link>
                  </li>

                  <NavCategory queryParams = {queryParams} />
              </ul>
          </nav>
      );
  }
