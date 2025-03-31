import { TIME_CACHE } from "@/app/common/constant";
import { fetcher, isErrorResponse } from "@/lib/utils";

 export const getTags = async () => {
      const tags = await fetcher<ITag[]>('tag', {
          method: 'GET',
          next: {
              revalidate: TIME_CACHE,
              tags: ['tags']
          },
      });
      if(isErrorResponse(tags)){
        return []
      }
      return tags
  };