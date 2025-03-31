import fetch from 'node-fetch';
import { NaverLocalSearchRequest, NaverLocalSearchResponse } from '../types/naver-local-types.js';
import { toQueryString } from '../utils/query-params.js';

export const naverLocalSearchApi = async (query: NaverLocalSearchRequest): Promise<NaverLocalSearchResponse> => {
    const queryString = toQueryString(query);
    const response = await fetch(`https://openapi.naver.com/v1/search/local.json?query=${queryString}`,
        {
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID as string,
                'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET as string,
            },
        }
    );
    
    return response.json() as Promise<NaverLocalSearchResponse>;
};