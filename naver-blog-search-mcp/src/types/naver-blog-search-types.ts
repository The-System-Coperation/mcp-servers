
export type Sort = 'sim' | 'date';

export interface NaverBlogSearchRequest {
    query: string;
    display?: number;  // 기본값: 10, 최대: 100
    start?: number;    // 기본값: 1, 최대: 1000
    sort?: Sort;  // sim: 정확도순, date: 날짜순
}

export interface NaverBlogSearchItem {
    title: string;
    link: string;
    description: string;
    bloggername: string;
    bloggerlink: string;
    postdate: string;
}

export interface NaverBlogSearchResponse {
    lastBuildDate: string;
    total: number;
    start: number;
    display: number;
    items: NaverBlogSearchItem[];
}
