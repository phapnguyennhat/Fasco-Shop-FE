import React from 'react';
import FilterOrder from './FilterOrder';
import { SearchParams } from '@/lib/utils';
import TableOrder from './TableOrder';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order',
  description: 'Manage your purchase',
};

interface IProps {
  searchParams: Promise<SearchParams>
}
export default async function Purchase({searchParams}: IProps) {
  const queryParams = await searchParams
    return (
        <main className="   flex flex-col items-center    flex-1">
          <FilterOrder queryParams={queryParams} />
          <TableOrder queryParams={queryParams} />
        </main>
    );
}
