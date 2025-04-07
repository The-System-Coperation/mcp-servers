# server.py

from mcp.server.fastmcp import FastMCP
import re
import json
from urllib.request import urlopen, Request
from urllib.parse import quote
from bs4 import BeautifulSoup
from model.response.wikipedia_detail import WikipediaDetailResult
from model.response.wikipedia_search_result import WikipediaSearchResults, WikipediaSearchResultItem
from model.request.wikipedia_search import WikipediaSearchRequest

mcp = FastMCP(
    name = "wiki-mcp",
    dependencies=["bs4"]
)


@mcp.tool()
def search_wekipedia(query: WikipediaSearchRequest) -> WikipediaSearchResults:
    """
    Performs advanced search on Wikipedia.
    
    Args:
        query: Wikipedia search request model
    
    Returns:
        WikipediaSearchResults: List of search results
    """
    # Get Wikipedia search URL
    search_url = query.get_search_url()
    
    try:
        # Set user agent
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko)'}
        request = Request(search_url, headers=headers)
        
        # Fetch search results page
        html = urlopen(request)
        
        # Parse search results from HTML
        return WikipediaSearchResults.from_html(html.read(), query.language)
    
    except Exception as e:
        # Return empty results in case of error
        return WikipediaSearchResults(results=[])


# Detail search

@mcp.tool()
def search_wikipedia_detail(query: str, language: str = "en") -> WikipediaDetailResult:
    """
    Fetches detailed content from a Wikipedia page.
    
    Args:
        query: Wikipedia page title or search term
        language: Wikipedia language code (default: "en", Korean: "ko")
    
    Returns:
        WikipediaDetailResult: Detailed information including title, content, URL
    """
    # Use the model's class method to fetch and parse Wikipedia page
    return WikipediaDetailResult.from_query(query, language)


def run_server():
    mcp.run()


if __name__ == "__main__":
    run_server()
