import { z } from "zod";

export const NewsSearchSchema = {
    // 검색어 (필수, UTF-8 인코딩 필요)
    query: z.string().min(1),

    // 검색 결과 개수 (기본값: 10, 최대: 100)
    display: z.number().int().min(1).max(100).optional(),

    // 검색 시작 위치 (기본값: 1, 최대: 1000)
    start: z.number().int().min(1).max(1000).optional(),

    // 정렬 방법
    sort: z.enum(['sim', 'date']).optional(),
}

