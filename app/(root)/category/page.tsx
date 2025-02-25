import React, { Suspense } from 'react'
import HeaderCategory from './HeaderCategory'
import ListCategory, { SkeletonListCategory } from './ListCategory'
import ListTag, { SkeletonListTag } from './ListTag';
import FormCreateCategory from './FormCreateCategory';
import FormCreateTag from './FormCreateTag';
import { getProfile } from '@/lib/api';
import ActionPage from './ActionPage';

export default function page() {
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
