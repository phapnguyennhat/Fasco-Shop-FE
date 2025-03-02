import React, { Suspense } from 'react'
import HeaderCategory from './HeaderCategory'
import ListCategory, { SkeletonListCategory } from './ListCategory'
import ListTag, { SkeletonListTag } from './ListTag';
import ActionPage from './ActionPage';



export const experimental_ppr = true;
export default function CategoryPage() {
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
