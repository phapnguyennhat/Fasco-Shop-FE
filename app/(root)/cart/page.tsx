import { SearchParams } from "@/lib/utils";
import Subscribe from "../components/Subscribe";
import HeaderCart from "./components/HeaderCart";
import TableCartItem from "./components/TableCartItem";
import TotalCart from "./components/TotalCart";
import { Suspense } from "react";

export default function CartPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  return (
      <>
          {' '}
          <HeaderCart />
          <TableCartItem searchParams={searchParams} />
          <Subscribe />
      </>
  );
}
