export const KEYWORD_SEARCH_TOOL_DESCRIPTION = `
A powerful tool for searching places and locations using Kakao Local API through keyword-based queries.

Key Features:
- Flexible keyword search with various filtering options
- Location-based search with radius or rectangular boundary constraints
- Category-based filtering using predefined category group codes
- Pagination support for handling large result sets
- Sorting options by distance or accuracy

Parameters explained:
- query: The keyword to search for (required)
- category_group_code: Filter results by specific category. Available categories:
  * MT1: Large-scale marts (e.g., E-mart, Homeplus, Lotte Mart)
  * CS2: Convenience stores (e.g., CU, GS25, 7-Eleven)
  * PS3: Kindergartens, daycare centers
  * SC4: Schools (elementary, middle, high schools)
  * AC5: Academic institutions (academies, education centers)
  * PK6: Parking lots
  * OL7: Gas stations, charging stations
  * SW8: Subway stations
  * BK9: Banks (e.g., commercial banks, agricultural cooperatives)
  * CT1: Cultural facilities (e.g., movie theaters, performance halls, museums)
  * AG2: Real estate agencies
  * PO3: Public institutions (government offices, public enterprises)
  * AT4: Tourist attractions
  * AD5: Accommodation (hotels, motels, pensions)
  * FD6: Restaurants
  * CE7: Cafes
  * HP8: Hospitals, medical clinics
  * PM9: Pharmacies
- x, y: Center coordinates for location-based search (longitude, latitude)
- radius: Search radius from center coordinates (max 20km)
- rect: Rectangular search boundary coordinates
- page: Page number for pagination (1-45)
- size: Results per page (1-15)
- sort: Sort results by 'distance' or 'accuracy'

Response includes:
- Detailed place information (name, address, coordinates)
- Category and subcategory information
- Contact details and place URLs
- Distance from center point (when using location-based search)
- Pagination metadata and region analysis

Best practices:
1. Provide specific keywords for more accurate results
2. Use category codes to filter relevant places
3. Combine with location parameters for localized search
4. Handle pagination for complete result sets
5. Consider sorting by distance when location is important

Note: This tool requires a valid Kakao REST API key for authentication.
Maximum 45 pages of results available per search.
`;
