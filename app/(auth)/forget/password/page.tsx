import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import PasswordForm from './Password.form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'New Password',
    description: 'Type your new password to reset',
  };

export default async function NewPasswordPage() {
    const cookieStore = await cookies();

    const resetPasswordCookie = cookieStore.get('ResetPassword')
    if(!resetPasswordCookie){
      redirect('/forget')
    }
    return (
      <>
                <section className="   flex justify-center lg:grid lg:grid-cols-2  max-w-[1280px] mx-2 sm:mx-4 xl:mx-auto mb-[60px] md:mb-[100px]   lg:mb-[150px] ">
                    <Image
                        src={'/images/loginImage.png'}
                        width={949}
                        height={1077}
                        alt="login Image"
                        className=" size-auto hidden lg:block"
                    />
                    <div className=" md:px-[26px] flex flex-col justify-between  max-w-[600px] w-full p-4 bg-slate-50 lg:bg-white  lg:px-[32px] xl:px-[50px] md:pt-[30px] lg:pt-[32px] xl:pt-[50px] pb-[26px]  ">
                        <div>
                            <h3 className=" font-volkhov hidden lg:block text-4xl md:text-[52px] md:leading-[52px] lg:text-[66px] lg:leading-[66px] mb-[12px] md:mb-[20px]  lg:mb-[26px] xl:mb-[38px]">
                                Fasco
                            </h3>
                            <h5 className=" font-volkhov text-center lg:text-start text-[30px] leading-[30px] text-[#000000]  mb-[20px] lg:mb-[30px]">
                            Enter Your New Password
                            </h5>
                            <PasswordForm/>
                        </div>
      
                        <p className=" w-full text-center md:text-end">FASCO Terms & Conditions</p>
                    </div>
                </section>
            </>
    )
}
