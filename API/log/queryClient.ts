import { fetcher, isErrorResponse } from "@/lib/utils";

export async function getLog({pageParam=1, limit=10, collection, createAt='desc'}: {pageParam: number, limit: number, collection?: string , createAt?: string}) {
    const searchParams = new URLSearchParams({
		page: pageParam,
		limit,
        collection,
        createAt
    } as any);

    const response = await fetcher<{data: ILog[], currentPage: number, nextPage: number, count: number}>(`log?${searchParams.toString()}`, {
        method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: "heeh"
      }
        
    })
    if (isErrorResponse(response)) {
		return { data: [], currentPage: 1, nextPage: 1, count:0 };
    }
    return response;
    
    
}