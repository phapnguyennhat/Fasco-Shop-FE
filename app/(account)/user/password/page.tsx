import { AuthBy } from '@/app/common/enum';
import React from 'react'
import { redirect } from 'next/navigation'
import FormChangePassword from './FormChangePassword';
import { Metadata } from 'next';
import { getProfile } from '@/APIService/user/query';

export const metadata: Metadata = {
  title: 'Change Password',
  description: 'Update your password',
};

export default async function Password() {
  const user = await getProfile()

  if(user?.authBy!==AuthBy.LOCAL){
    redirect('/user/profile')
  }

  return (
      <main className='w-full' >
          <div className="  pl-4 pb-[18px] w-full mb-[30px] border-b  ">
              <h2 className="  text-[#333] text-lg">Change Password</h2>
              <p className="text-sm text-[#555]">
                  Change your password to secure account
              </p>
          </div>
          
          <FormChangePassword user={user} />
      </main>
  );
}
