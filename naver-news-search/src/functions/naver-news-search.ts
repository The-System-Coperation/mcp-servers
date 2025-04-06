import { toQueryString } from "../utils/query-params.js";
import fetch from "node-fetch";

interface NaverNewsSearchRequest {
    query: string;
    display?: number;
    start?: number;
    sort?: 'sim' | 'date';
}

interface NaverNewsSearchItem {
    title: string;
    originallink: string;
    link: string;
    description: string;
    pubDate: string;
}

interface NaverNewsSearchResponse {
    lastBuildDate: string;
    total: number;
    start: number;
    display: number;
    items: NaverNewsSearchItem[];
}

// 네이버 API 오류 응답 타입
interface NaverErrorResponse {
    errorCode?: string;
    errorMessage?: string;
}

export default async function naverNewsSearch(query: NaverNewsSearchRequest): Promise<NaverNewsSearchResponse> {
    const queryString = toQueryString(query);   

    const response = await fetch(`https://openapi.naver.com/v1/search/news.json?${queryString}`, {
        headers: {
            "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID ?? "",
            "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET ?? "",
        },
    });

    // API 응답 오류 처리
    if (!response.ok) {
        const errorData = await response.json().catch(() => null) as NaverErrorResponse | null;
        const status = response.status;
        const errorMessage = errorData?.errorMessage || response.statusText;
        const errorCode = errorData?.errorCode || 'UNKNOWN';
        
        throw new Error(`네이버 API 오류 (${status}): ${errorCode} - ${errorMessage}`);
    }

    return response.json() as Promise<NaverNewsSearchResponse>;
}