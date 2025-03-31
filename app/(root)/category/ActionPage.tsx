import { getProfile } from '@/api/user/query';
import FormCreateCategory from './FormCreateCategory';
import FormCreateTag from './FormCreateTag';
import { ERole } from '@/app/common/enum';

export default async function ActionPage() {
    const user = await getProfile()
    if(user?.role !==ERole.ADMIN){
      return;
    }
    return (
        <section className=" mb-[20px] flex  justify-center sm:justify-end space-x-2 md:space-x-4   px-4 section-page_home">
            <FormCreateCategory />
            <FormCreateTag />
        </section>
    );
}
