'use client'


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
import { useToast } from "@/hooks/use-toast"
import { setSpinner } from "@/lib/features/spinner/spinnerSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Trash2 } from 'lucide-react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { deleteCategory } from '@/APIService/category/action';

interface IProps {
  categoryId: string
}
export default function DialogDeleteCategory({categoryId}: IProps) {
  const {toast} = useToast()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
      dispatch(setSpinner(true));
      await deleteCategory(categoryId);
      dispatch(setSpinner(false));
      toast({
          description: ' Delete category successfully.',
      });
  };


  return (
    <Dialog open={open} onOpenChange={(open)=> setOpen(open)} >
      <DialogTrigger asChild>
        <button className="hover:text-red-500"  >
          <FaDeleteLeft  />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Confirm deletion of the category. Once deleted, it cannot be undone
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
