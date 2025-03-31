import fetch from "node-fetch";
import { KeywordSearchParams, KeywordSearchResponse } from "../types/keyword_search_types";
import { toQueryString } from "../utils/query_params";

export async function searchKakaoLocalApi(params: KeywordSearchParams): Promise<KeywordSearchResponse> {
    const queryString = toQueryString(params);
    const result = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?${queryString}`, {
        headers: {
            Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
        },
    });
    
    return result.json() as Promise<KeywordSearchResponse>;
}