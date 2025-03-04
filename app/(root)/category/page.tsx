import React, { Suspense } from 'react'
import HeaderCategory from './HeaderCategory'
import ListCategory, { SkeletonListCategory } from './ListCategory'
import ListTag, { SkeletonListTag } from './ListTag';
import ActionPage from './ActionPage';
import { Metadata } from 'next';
import { delay } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Category & Tag',
  description: 'All of categories and tags',
};

export const experimental_ppr = true;
export default  function CategoryPage() {
  return (
      <>
          <HeaderCategory />

          <Suspense>
            <ActionPage/>
          </Suspense>

          <Suspense fallback={<SkeletonListCategory/>}>
              <ListCategory />
          </Suspense>

          <Suspense fallback={<SkeletonListTag/>} >
            <ListTag/>
          </Suspense>

      </>
  );
}
