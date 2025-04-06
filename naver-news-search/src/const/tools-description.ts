export const NEWS_SEARCH_TOOL_DESCRIPTION = `
A powerful tool utilizing Naver Search API's news search functionality.

Key Features:
- Comprehensive access to Naver News search results
- Support for sorting options by accuracy or date
- Detailed news article information
- Access to news from major Korean media outlets

Parameters explained:
- query: The search keyword (required, must be UTF-8 encoded)
- display: Number of search results to display at once (default: 10, max: 100)
- start: Starting position of search results (default: 1, max: 1000)
- sort: Method for sorting search results
  * sim: Sort by accuracy in descending order (default)
  * date: Sort by date in descending order

Response includes:
- News article title and Naver News URL
- Original news article URL
- News article content summary
- Publication date
- Total number of search results
- Pagination metadata

Usage tips:
1. Use specific keywords for accurate news search
2. Utilize sorting options according to user needs
3. Apply pagination for handling large result sets
4. Consider date sorting for time-sensitive news searches

Note: This tool requires valid Client ID and Client Secret issued by Naver Developer Center.
Maximum 25,000 API calls per day.
Provides up to 1,000 results per search.
`;