import { fetcher, isErrorResponse } from "@/lib/utils";

export async function getLog({ pageParam = 1, limit = 10, collection, createAt = 'desc' }: { pageParam: number, limit: number, collection?: string, createAt?: string }) {
  const searchParams = new URLSearchParams({
    page: pageParam,
    limit,
    collection,
    createAt
  } as any);

  const response = await fetch(`/api/log?${searchParams.toString()} `, {
    method: 'GET',
    credentials: 'include',
  })

  const data = await response.json()

  return data as { data: ILog[], currentPage: number, nextPage: number, count: number };


}