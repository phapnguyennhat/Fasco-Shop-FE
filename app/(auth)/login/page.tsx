import Image from 'next/image';
import FollowUs from '../../(root)/components/FollowUs';
import Subscribe from '../../(root)/components/Subscribe';
import LoginGoogle from './components/LoginGoogle';
import LoginFacebook from './components/LoginFacebook';
import { Minus } from 'lucide-react';
import LoginForm from './components/login.form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login now to start shopping!',
    description: 'Login Fasco to explore many product',
};

export default  function Login() {
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
                <div className=" md:px-[26px] w-[80%] max-w-[600px] lg:w-full p-4 bg-slate-50 lg:bg-white  lg:px-[32px] xl:px-[50px] md:pt-[30px] lg:pt-[32px] xl:pt-[50px] pb-[26px]  ">
                    <h3 className=" font-volkhov hidden lg:block text-4xl md:text-[52px] md:leading-[52px] lg:text-[66px] lg:leading-[66px] mb-[12px] md:mb-[20px]  lg:mb-[26px] xl:mb-[38px]">
                        Fasco
                    </h3>
                    <h5 className=" font-volkhov text-center lg:text-start text-[30px] leading-[30px] text-[#000000] mb-[12px] md:mb-[20px] lg:mb-[30px]">
                        Sign In To FASCO
                    </h5>

                    <div className=" flex flex-col md:flex-row lg:flex-col xl:flex-row  justify-center gap-5 mb-[20px] md:mb-[40px] lg:mb-[40px]  xl:mb-[60px]">
                        <LoginGoogle />
                        <LoginFacebook />
                    </div>
                    <span className=" text-[#838383] lg:text-2xl xl:text-3xl  flex justify-center items-center mb-[16px] md:mb-[8px] lg:mb-[16px] xl:mb-[26px] ">
                        {' '}
                        <Minus size={30} /> OR <Minus size={30} />{' '}
                    </span>

                      <LoginForm/>
                      <p className=' w-full text-end' >FASCO Terms & Conditions</p>
                </div>
            </section>

           
        </>
    );
}
