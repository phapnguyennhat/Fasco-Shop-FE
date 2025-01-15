import BannerSale from "./components/BannerSale";
import BrandHome from "./components/BrandHome";
import DealsOfMonth from "./components/DealsOfMonth";
import ExtraNav from "./components/ExtraNav";
import NewArrival from "./components/NewArrival";
import TriggerExtraNav from "./components/TriggerExtraNav";


export default async function Home({searchParams}: {searchParams: Promise<{search?: string}>}) {
  const {search} = await searchParams
  return (
   <>
    <BannerSale/>
    <BrandHome/>
    <TriggerExtraNav/>
    <ExtraNav/>
    <DealsOfMonth/>
    <NewArrival search={search|| "Men's Fashion"}/>
   </>
  );
}
