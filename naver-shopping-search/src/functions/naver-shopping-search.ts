import { toQueryString } from "../utils/query-params.js";
import fetch from "node-fetch";

interface NaverShoppingSearchRequest {
    query: string;
    display?: number;
    start?: number;
    sort?: 'sim' | 'date' | 'asc' | 'dsc';
    filter?: 'naverpay';
    exclude?: string;
}

interface NaverShoppingSearchItem {
    title: string;
    link: string;
    image: string;
    lprice: number;
    hprice: number;
    mallName: string;
    productId: string;
    productType: number;
    brand: string;
    maker: string;
    category1: string;
    category2: string;
    category3: string;
    category4: string;
}

interface NaverShoppingSearchResponse {
    lastBuildDate: string;
    total: number;
    start: number;
    display: number;
    items: NaverShoppingSearchItem[];
}

export default async function naverShoppingSearch(query: NaverShoppingSearchRequest): Promise<NaverShoppingSearchResponse> {
    const queryString = toQueryString(query);   

    const response = await fetch(`https://openapi.naver.com/v1/search/shop.json?${queryString}`, {
        headers: {
            "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID ?? "",
            "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET ?? "",
        },
    })

    return response.json() as Promise<NaverShoppingSearchResponse>;
}