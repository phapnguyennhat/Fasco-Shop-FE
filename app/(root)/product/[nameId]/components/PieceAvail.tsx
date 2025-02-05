import { SearchParams } from "@/lib/utils";

interface IProps{
  product: Product,
  searchParams: Promise<SearchParams>;
  
}


export default async function PieceAvail({product, searchParams}: IProps) {
  const queryParams = await searchParams
  
  return (
    <div>PieceAvail</div>
  )
}
