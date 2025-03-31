export const BLOG_SEARCH_TOOL_DESCRIPTION = `
A powerful tool for searching blog posts using Naver Blog Search API through keyword-based queries.

Key Features:
- Flexible keyword search with various filtering options
- Sorting options by accuracy or date
- Pagination support for handling large result sets
- Customizable display count for search results

Parameters explained:
- query: The keyword to search for (required)
- display: Number of results to display per page (default: 10, max: 100)
- start: Starting position of search results (default: 1, max: 1000)
- sort: Sort results by:
  * sim: Sort by accuracy (default)
  * date: Sort by date

Response includes:
- Blog post title and description
- Blog post URL and blogger's profile link
- Blogger's name and blog URL
- Post date
- Total count of search results
- Pagination metadata

Best practices:
1. Provide specific keywords for more accurate results
2. Use display parameter to control result count per page
3. Use start parameter for pagination
4. Consider sorting by date for time-sensitive searches
5. Handle pagination for complete result sets

Note: This tool requires valid Naver Client ID and Client Secret for authentication.
Maximum 25,000 API calls per day.
Maximum 1000 results available per search.
`;