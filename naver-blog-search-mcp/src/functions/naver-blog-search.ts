import { NaverBlogSearchRequest, NaverBlogSearchResponse } from "../types/naver-blog-search-types.js";
import { toQueryString } from "../utils/query-params.js";
import fetch from "node-fetch";


export default async function naverBlogSearch(query: NaverBlogSearchRequest): Promise<NaverBlogSearchResponse> {
    const queryString = toQueryString(query);   
    const response = await fetch(`https://openapi.naver.com/v1/search/blog.json?${queryString}`, {
        headers: {
            "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID ?? "",
            "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET ?? "",
        },
    })

    return response.json() as Promise<NaverBlogSearchResponse>;
}