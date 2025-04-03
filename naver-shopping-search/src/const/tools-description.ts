export const SHOPPING_SEARCH_TOOL_DESCRIPTION = `
A powerful API tool for searching products from Naver Shopping service.

Key Features:
- Comprehensive product search across Naver Shopping
- Multiple sorting options (accuracy, date, price)
- Product filtering capabilities
- Detailed product information in results

Parameters explained:
- query: The keyword to search for (required). Must be UTF-8 encoded.
- display: Number of results to display per page (default: 10, max: 100)
- start: Starting position of search results (default: 1, max: 1000)
- sort: Sort results by:
  * sim: Sort by accuracy (default)
  * date: Sort by date
  * asc: Sort by price ascending
  * dsc: Sort by price descending
- filter: Filter products by:
  * naverpay: Show only Naver Pay integrated products
- exclude: Exclude specific product types:
  * used: Used products
  * rental: Rental products
  * cbshop: Overseas direct purchase and buying agency

Response includes:
- Product title and link
- Product image URL
- Lowest and highest prices
- Mall name and product ID
- Product type information
- Brand and manufacturer details
- Category hierarchy information (up to 4 levels)
- Total count of search results
- Pagination metadata

Best practices:
1. Use specific keywords for accurate product search
2. Utilize sorting options based on user needs
3. Apply appropriate filters to narrow down results
4. Handle pagination for large result sets
5. Consider product type exclusions when needed

Note: This tool requires valid Naver Client ID and Client Secret for authentication.
Maximum 25,000 API calls per day.
Results are limited to 1,000 items per search.
`;