import { getLog } from "@/API/log/queryClient"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useGetLog = ({collection, createAt}: {collection?: string, createAt?: string}) => {
    return useInfiniteQuery({
        queryKey: ['log', collection, createAt],
        queryFn: ({pageParam}) => getLog({pageParam, limit: 10, collection, createAt}),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,    
    })
}