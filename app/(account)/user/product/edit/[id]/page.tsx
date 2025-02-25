import { SearchParams } from "@/lib/utils"

interface IProps {
  searchParams: Promise<{id: string}>
}
export default function EditProduct({searchParams}: IProps) {
  return (
    <main className=" w-full pl-4 ">
              <section className="   pl-4 pb-[18px] w-full mb-[30px] border-b  ">
                  <h2 className="  text-[#333] text-lg">Update Product</h2>
              </section>
    
              <section className="    overflow-x-scroll mb-[30px] scrollbar-hide  w-full">
                  
                    
              </section>
    
    
          </main>
  )
}
