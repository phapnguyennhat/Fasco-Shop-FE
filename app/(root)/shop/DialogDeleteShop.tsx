
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Trash2 } from "lucide-react"

interface IProps {
  handleDelete:  () => Promise<void>
}

export default function DialogDeleteShop({handleDelete}:IProps) {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <button className=" p-2 text-white rounded-lg bg-black/70 hover:bg-red-500"  >
        <Trash2 size={20} />


      </button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Delete Shop</DialogTitle>
        <DialogDescription>
          Confirm deletion of the shop. Once deleted, it cannot be undo
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
