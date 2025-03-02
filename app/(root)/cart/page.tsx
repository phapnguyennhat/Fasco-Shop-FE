import { SearchParams } from "@/lib/utils";
import Subscribe from "../components/Subscribe";
import HeaderCart from "./components/HeaderCart";
import TableCartItem from "./components/TableCartItem";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Manage your cart',
};

export default function CartPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  return (
      <>
          {' '}
          <HeaderCart />
          <Suspense ><TableCartItem searchParams={searchParams} /></Suspense>
          <Subscribe />
      </> 
  );
}
