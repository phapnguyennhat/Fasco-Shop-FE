import { Input } from '@/components/ui/input';
import Image from 'next/image';
import FollowUs from '../components/FollowUs';
import Subscribe from '../components/Subscribe';
import LoginGoogle from './components/LoginGoogle';
import LoginFacebook from './components/LoginFacebook';

export default function Login() {
    return (
       <>
          <section className=" min-h-screen grid grid-cols-2  max-w-[1280px] mx-auto  "  >
              <Image
                  src={'/images/loginImage.png'}
                  width={949}
                  height={1077}
                  alt="login Image"
                  className=" size-auto"
              />
              <div  className=' p-[50px]  ' >
                <h3 className=' font-volkhov lg:text-[66px] lg:leading-[66px] mb-[38px]' >Fasco</h3>
                <h5 className=' font-volkhov text-[30px] leading-[30px] text-[#000000] mb-[18px]' >Sign In To FASCO</h5>

                <div>
                  <LoginGoogle/>
                  <LoginFacebook/>
                </div>
              </div>
          </section>

          <FollowUs/>
          <Subscribe/>
       </>

        
    );
}
