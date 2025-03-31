type NaverLocalSearchSort = 'random' | 'comment';

// 네이버 지역 검색 API 요청 파라미터 타입
export interface NaverLocalSearchRequest {
  query: string;      // 검색어
  display?: number;   // 한 번에 표시할 검색 결과 개수 (기본값: 1, 최댓값: 5)
  start?: number;     // 검색 시작 위치 (기본값: 1, 최댓값: 1)
  sort?: NaverLocalSearchSort;  // 검색 결과 정렬 방법
}

// 네이버 지역 검색 API 응답 아이템 타입
export interface NaverLocalSearchItem {
  title: string;      // 업체, 기관의 이름
  link: string;       // 업체, 기관의 상세 정보 URL
  category: string;   // 업체, 기관의 분류 정보
  description: string; // 업체, 기관에 대한 설명
  telephone: string;  // 전화번호
  address: string;    // 업체, 기관명의 지번 주소
  roadAddress: string; // 업체, 기관명의 도로명 주소
  mapx: number;       // 업체, 기관이 위치한 장소의 x 좌표
  mapy: number;       // 업체, 기관이 위치한 장소의 y 좌표
}

// 네이버 지역 검색 API 응답 타입
export interface NaverLocalSearchResponse {
  lastBuildDate: string;  // 검색 결과를 생성한 시간
  total: number;          // 총 검색 결과 개수
  start: number;          // 검색 시작 위치
  display: number;        // 한 번에 표시할 검색 결과 개수
  items: NaverLocalSearchItem[];  // 검색 결과 아이템 배열
}
