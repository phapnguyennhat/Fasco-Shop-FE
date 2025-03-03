'use client'

import Link from "next/link";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import DialogDeleteTag from "./DialogDeleteTag";
import FormUpdateTag from "./FormUpdateTag";

interface IProps {
  tag: ITag
}
export default function TagAdmin({tag} : IProps) {

      const [openEdit, setOpenEdit] = useState(false);
      
      if(openEdit){
        return <FormUpdateTag tag={tag} setOpenEdit={setOpenEdit} />
      }
  
      return (
        <li className=" gap-2  inline-flex items-center" key={tag.name}>
            <Link
                className="hover:underline"
                href={`product?categoryName=${tag.name}`}
            >
                {tag.name}
            </Link>
            <div className="  gap-1 items-center hidden lg:inline-flex">
                {' '}
                <button
                    onClick={() => setOpenEdit(true)}
                    className=" hover:text-blue-500"
                >
                    <MdEdit />
                </button>
                <DialogDeleteTag tagId={tag.id} />
            </div>
        </li>
    );
}
