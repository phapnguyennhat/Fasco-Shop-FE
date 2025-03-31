'use client';
import { createTag } from '@/API/tag/action';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { isErrorResponse } from '@/lib/utils';
import { BadgePlus } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


export default function FormCreateTag() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { toast } = useToast();
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (name === '') {
          toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong',
              description: 'Name Tag is required',
          });
          return;
      }

      try {
          dispatch(setSpinner(true));

          const response =await createTag(name)

          if(isErrorResponse(response)){
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: response.message,
            });
          }else{
              toast({
                  description: 'Create Tag successfully.',
              });
              setOpen(false)

          }

          dispatch(setSpinner(false));
      } catch (error: any) {
          toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
          });
          dispatch(setSpinner(false));
      }
  };

  return (
      <Dialog open={open} onOpenChange={(open)=>setOpen(open)} >
          <DialogTrigger asChild>
              <Button
                  className="border hover:text-white border-black bg-white text-black"
                  type="button"
              >
                  New Tag <BadgePlus />
              </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
              <DialogHeader>
                  <DialogTitle>Create Tag</DialogTitle>
                  {/* <DialogDescription>
        Anyone who has this link will be able to view this.
      </DialogDescription> */}
              </DialogHeader>

              <form onSubmit={handleSubmit}>
                  <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className=" mb-2"
                      placeholder="Name Tag"
                  />

                  <DialogFooter className="flex-row items-center justify-center space-x-1  sm:justify-start">
                      <DialogClose asChild>
                          <button
                              type="button"
                              className=" px-4 py-2 border hover:bg-red-500 hover:border-red-500  hover:text-white border-black text-black rounded-md"
                          >
                              Cancel
                          </button>
                      </DialogClose>
                      <button
                          type="submit"
                          className=" hover:bg-black hover:text-white px-4 py-2 border border-black text-black rounded-md"
                      >
                          Save
                      </button>
                  </DialogFooter>
              </form>
          </DialogContent>
      </Dialog>
  );
}
