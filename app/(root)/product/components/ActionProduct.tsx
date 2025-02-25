
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import DialogDeleteProduct from './DialogDeleteProduct';


interface IProps {
    productId: string
}
export default function ActionProduct({productId}: IProps) {
    return (
        <div className="absolute   inset-0 flex items-center justify-center  ">
            <div
                className="   invisible group-hover:visible opacity-0 group-hover:opacity-100 
                        translate-y-[10px] group-hover:translate-y-0 transition-all duration-300 
                        inline-flex gap-3"
            >
                <Link href={`user/product/edit/${productId}`} 
                   
                    className=" p-2 text-white rounded-lg bg-black/70 hover:bg-black/85"
                >
                    <Pencil size={20} />
                </Link>
               <DialogDeleteProduct productId={productId} />
            </div>
        </div>
    );
}
