export interface NaverNewsSearchRequest {
    query: string;              // 검색어 (UTF-8 인코딩 필요)
    display?: number;           // 검색 결과 개수 (기본값: 10, 최대: 100)
    start?: number;             // 검색 시작 위치 (기본값: 1, 최대: 1000)
    sort?: 'sim' | 'date';      // 정렬 방법
}

export interface NaverNewsSearchItem {
    title: string;             // 뉴스 제목
    originallink: string;      // 원본 뉴스 URL
    link: string;              // 네이버 뉴스 URL
    description: string;       // 뉴스 내용 요약
    pubDate: string;           // 발행 시간
}

export interface NaverNewsSearchResponse {
    lastBuildDate: string;     // 검색 결과 생성 시간
    total: number;             // 총 검색 결과 개수
    start: number;             // 검색 시작 위치
    display: number;           // 한 번에 표시할 검색 결과 개수
    items: NaverNewsSearchItem[];  // 검색 결과 목록
} 