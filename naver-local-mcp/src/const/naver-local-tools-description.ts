export const NAVER_LOCAL_SEARCH_TOOL_DESCRIPTION = `
A powerful API tool for searching businesses and institutions registered in Naver Local service.

Key Features:
- Flexible keyword-based local search
- Sorting options by accuracy or review count
- Adjustable search result count
- Location information based on KATECH coordinate system

Parameters explained:
- query: Search keyword (required)
- display: Number of results to display per page (default: 1, max: 5)
- start: Starting position of search results (default: 1, max: 1)
- sort: Sort results by:
  * random: Sort by accuracy (default)
  * comment: Sort by number of reviews for businesses/institutions

Response includes:
- Business/institution name and detailed information
- Category information
- Both lot number and road name addresses
- Coordinates compatible with Naver Maps API (mapx, mapy)
- Total count of search results
- Pagination metadata

Best practices:
1. Use specific keywords for accurate results
2. Control result count using display parameter
3. Implement pagination using start parameter
4. Utilize sort parameter when review-based sorting is needed
5. Coordinate information can be integrated with Naver Maps API

Note: Maximum 5 results can be displayed per search.
`;