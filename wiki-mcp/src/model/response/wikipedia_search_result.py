from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field, HttpUrl
from bs4 import BeautifulSoup, Tag

class WikipediaSearchResultItem(BaseModel):
    """
    Wikipedia search result item
    
    - title: Search result title
    - detail: Detailed content
    - url: Wikipedia page URL
    """
    
    title: str = Field(description="Search result title")
    detail: str = Field(description="Search result detailed content")
    url: str = Field(description="Wikipedia page URL")
    
    @classmethod
    def from_html_element(cls, item: Tag, language: str = "en") -> "WikipediaSearchResultItem":
        """
        Create a WikipediaSearchResultItem from a BeautifulSoup HTML element
        
        Args:
            item: HTML element representing a search result
            language: Wikipedia language code
            
        Returns:
            WikipediaSearchResultItem: Parsed search result item
        """
        # Extract title
        title_elem = item.find("div", {"class": "mw-search-result-heading"})
        title = title_elem.get_text().strip() if title_elem else "No title"
        
        # Extract URL
        url = ""
        if title_elem and title_elem.find("a"):
            path = title_elem.find("a").get("href", "")
            url = f"https://{language}.wikipedia.org{path}"
        
        # Extract content
        detail_elem = item.find("div", {"class": "searchresult"})
        detail = ""
        if detail_elem:
            # Extract content with HTML tags (may contain span tags)
            detail = str(detail_elem)
        
        # Return result item
        return cls(
            title=title,
            detail=detail,
            url=url
        )

class WikipediaSearchResults(BaseModel):
    """
    Wikipedia search results list
    - results: List of search results
    """
    results: List[WikipediaSearchResultItem] = Field(default_factory=list, description="List of search results")
    
    @classmethod
    def from_html(cls, html_content: str, language: str = "en") -> "WikipediaSearchResults":
        """
        Parse Wikipedia search results from HTML content
        
        Args:
            html_content: HTML content of Wikipedia search results page
            language: Wikipedia language code
            
        Returns:
            WikipediaSearchResults: Parsed search results
        """
        bs = BeautifulSoup(html_content, "html.parser")
        search_results = []
        
        # Extract search result items
        result_items = bs.find_all("li", {"class": "mw-search-result"})
        
        for item in result_items:
            result_item = WikipediaSearchResultItem.from_html_element(item, language)
            search_results.append(result_item)
        
        return cls(results=search_results) 