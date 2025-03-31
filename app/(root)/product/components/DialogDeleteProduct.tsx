'use client';

import { deleteProduct } from '@/api/product/action';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface IProps {
    productId: string;
}
export default function DialogDeleteProduct({ productId }: IProps) {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
            dispatch(setSpinner(true));
            await deleteProduct(productId);
            dispatch(setSpinner(false));
            setOpen(false)
            toast({
                description: ' Delete product successfully.',
            });
        
    };

    return (
      <Dialog open={open} onOpenChange={(open)=> setOpen(open)} >
      <DialogTrigger asChild>
        <button className=" p-2 text-white rounded-lg bg-black/70 hover:bg-red-500"  >
          <Trash2 size={20} />
  
  
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Confirm deletion of the product. Once deleted, it cannot be undone
          </DialogDescription>
        </DialogHeader>
       
        <DialogFooter className=" flex-row items-center justify-center space-x-1  sm:justify-start">
          <DialogClose asChild>
            <button type="button" className=" px-4 py-2 border hover:bg-red-500 hover:border-red-500  hover:text-white border-black text-black rounded-md"  >
              Cancel
            </button>
          </DialogClose>
  
          <button onClick={handleDelete} className=" hover:bg-black hover:text-white px-4 py-2 border border-black text-black rounded-md" >Confirm</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}
