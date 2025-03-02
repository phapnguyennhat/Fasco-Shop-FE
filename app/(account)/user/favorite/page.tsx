import { SearchParams } from "@/lib/utils";
import NavFavorite from "./components/NavFavorite";
import { Suspense } from "react";
import ProductContent from "./components/ProductContent";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Favorite Products',
    description: 'View your favorite products',
  };

interface IProps {
    searchParams: Promise<SearchParams>
}
export default function Favorite({searchParams}: IProps) {
    return (
        <main className=' flex flex-col items-center     flex-1' >
            <NavFavorite searchParams = {searchParams} />
          <Suspense>  <ProductContent searchParams={searchParams}/></Suspense>
        </main>
    );
}
