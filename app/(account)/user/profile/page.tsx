import { getProfile } from "@/lib/api";
import FormProfile from "./components/FormProfile";
import SelectImage from "./components/SelectImage";

export default async function Profile() {
  const user = await getProfile()
    return (
        <main className="  w-full  pt-4 pl-4 bg-white">
            <div className="pb-[18px] mb-[30px] border-b  ">
                <h2 className="  text-[#333] text-lg">My Profile</h2>
                <p className="text-sm text-[#555]">
                    Manage your profile to secure account
                </p>
            </div>

             <div className="  overflow-x-scroll mb-[30px] scrollbar-hide  w-full">
                    <div className=" min-w-[580px]   flex items-center">
                        <FormProfile user={user} />
                        <SelectImage user={user} />
                    </div>
             </div>
        </main>
    );
}
