'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import FormUpdateCategory from './FormUpdateCategory';
import { useDispatch } from 'react-redux';
import DialogDeleteCategory from './DialogDeleteCategory';

interface IProps {
    category: ICategory;
}
export default function CategoryAdmin({ category }: IProps) {
    const [openEdit, setOpenEdit] = useState(false);

    if (openEdit) {
        return (
            <FormUpdateCategory category={category} setOpenEdit={setOpenEdit} />
        );
    }

   
    

    return (
        <li className=" gap-2  inline-flex items-center" key={category.name}>
            <Link
                className="hover:underline"
                href={`product?categoryName=${category.name}`}
            >
                {category.name}
            </Link>
            <div className="  gap-1 items-center hidden lg:inline-flex">
                {' '}
                <button
                    onClick={() => setOpenEdit(true)}
                    className=" hover:text-blue-500"
                >
                    <MdEdit />
                </button>
                <DialogDeleteCategory categoryId={category.id} />
            </div>
        </li>
    );
}
