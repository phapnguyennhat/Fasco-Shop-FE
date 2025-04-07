import { getLog } from "@/API/log/queryClient";
import { fetcher } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // get search params 
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 10
    const collection = searchParams.get('collection') || 'all'
    const createAt = searchParams.get('createAt') || 'DESC'
    const authCookie = request.headers.get('Cookie')
    if (!authCookie) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    } 
     
    const log  = await fetcher(`log?page=${page}&limit=${limit}&collection=${collection}&createAt=${createAt}`, {
        headers: {
            'Cookie': authCookie
        }
    })
    
    return NextResponse.json(log)

}