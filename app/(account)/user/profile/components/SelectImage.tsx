'use client'
import { useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { File } from "buffer";
import { useToast } from "@/hooks/use-toast";
import { isErrorResponse } from "@/lib/utils";
import { updateAvatar } from "@/api/user/action";

interface IProps {
  user: User|undefined
}

export default function SelectImage({ user }: IProps) {
  // const [preview, setPreview] = useState<string >(user?.avatar?.url || "/images/default_avt.png");
  const [image, setImage] = useState<Blob|undefined> (undefined)
  const { toast } = useToast()


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file )
   
  };
  const [loading, setLoading] = useState(false)

  const handleSave = async (file: Blob|undefined)=>{
    if(!file){
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: 'without image'
      })
      return
    }
    try {
      setLoading(true)
      const response =  await updateAvatar(file)
      if(isErrorResponse(response)){
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: response.message,
        })
      }else{
        toast({
          description: "Update avatar successfully.",
          
        })
      }
      setLoading(false)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      })
      setLoading(false)
    }
  }

  const preview = useMemo(()=>{
    if(image){
    return URL.createObjectURL(image as any)
    }else{
      return user?.avatar?.url || "/images/default_avt.png"
    }
  },[image])


  const disable =( preview ===(user?.avatar?.url || "/images/default_avt.png")) || loading

  return (
      <div className="   mx-auto  px-2 md:px-4 lg:px-5 border-l  text-center">
          <label className=" flex flex-col items-center justify-center cursor-pointer ">
              <Image
                  alt="avatar image"
                  src={preview}
                  width={100}
                  height={100}
                  className="rounded-full size-[100px] object-cover"
              />
              <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
              />
              <span className="block mt-[20px] text-sm mb-[15px]  p-2 border">Choose Image</span>
          </label>
          <p className=" text-sm text-center w-full ">Maximum file size is 1 MB</p>
          <p className=" mb-[12px]  text-center text-sm w-full " >Format: Image</p>
          <Button onClick={()=>handleSave(image)} className={`${disable && 'bg-gray-800'}`}  disabled={disable} >Save</Button>
      </div>
  );
}
