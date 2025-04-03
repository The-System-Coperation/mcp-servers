export interface NaverShoppingSearchRequest {
    query: string;              // 검색어 (UTF-8 인코딩 필요)
    display?: number;           // 검색 결과 개수 (기본값: 10, 최대: 100)
    start?: number;             // 검색 시작 위치 (기본값: 1, 최대: 1000)
    sort?: 'sim' | 'date' | 'asc' | 'dsc';  // 정렬 방법
    filter?: 'naverpay';        // 검색 결과에 포함할 상품 유형
    exclude?: string;           // 검색 결과에서 제외할 상품 유형 (예: 'used:rental:cbshop')
}

export interface NaverShoppingSearchItem {
    title: string;             // 상품 이름
    link: string;              // 상품 URL
    image: string;             // 상품 이미지 URL
    lprice: number;            // 최저가
    hprice: number;            // 최고가
    mallName: string;          // 쇼핑몰 이름
    productId: string;         // 상품 ID
    productType: number;       // 상품 타입
    brand: string;             // 브랜드
    maker: string;             // 제조사
    category1: string;         // 카테고리1
    category2: string;         // 카테고리2
    category3: string;         // 카테고리3
    category4: string;         // 카테고리4
}

export interface NaverShoppingSearchResponse {
    lastBuildDate: string;     // 검색 결과 생성 시간
    total: number;             // 총 검색 결과 개수
    start: number;             // 검색 시작 위치
    display: number;           // 한 번에 표시할 검색 결과 개수
    items: NaverShoppingSearchItem[];  // 검색 결과 목록
} 