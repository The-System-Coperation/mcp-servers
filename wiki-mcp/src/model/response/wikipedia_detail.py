from typing import List, Optional
import re
from urllib.request import urlopen
from urllib.parse import quote
from bs4 import BeautifulSoup
from pydantic import BaseModel, Field

class WikipediaDetailResult(BaseModel):
    """
    Wikipedia detailed page information
    
    - title: Wikipedia page title
    - content: Page content
    - url: Wikipedia page URL
    - related_links: List of related page links
    """
    
    title: str = Field(description="Wikipedia page title")
    content: str = Field(description="Wikipedia page content")
    url: str = Field(description="Wikipedia page URL")
    related_links: List[dict] = Field(default_factory=list, description="List of related page links")
    
    @classmethod
    def from_query(cls, query: str, language: str = "en") -> "WikipediaDetailResult":
        """
        Fetch and parse Wikipedia page details from a query
        
        Args:
            query: Wikipedia page title or search term
            language: Wikipedia language code (default: "en")
            
        Returns:
            WikipediaDetailResult: Parsed Wikipedia page details
        """
        # Encode query string for URL
        encoded_query = quote(query.replace(' ', '_'))
        
        # Create Wikipedia URL
        url = f"https://{language}.wikipedia.org/wiki/{encoded_query}"
        
        try:
            # Fetch page
            html = urlopen(url)
            return cls.from_html(html.read(), url, language)
        
        except Exception as e:
            # Return basic information in case of error
            return cls(
                title=query,
                content=f"An error occurred while fetching the page: {str(e)}",
                url=url,
                related_links=[]
            )
    
    @classmethod
    def from_html(cls, html_content, url: str, language: str = "en") -> "WikipediaDetailResult":
        """
        Parse Wikipedia page details from HTML content
        
        Args:
            html_content: HTML content of Wikipedia page
            url: Wikipedia page URL
            language: Wikipedia language code
            
        Returns:
            WikipediaDetailResult: Parsed Wikipedia page details
        """
        bs = BeautifulSoup(html_content, "html.parser")
        
        # Extract title
        title_elem = bs.h1
        title = title_elem.get_text() if title_elem else url.split('/')[-1]
        
        # Extract content (first paragraphs)
        content = ""
        bodyContent = bs.find("div", {"id": "bodyContent"})
        if bodyContent:
            paragraphs = bodyContent.find_all("p")
            if paragraphs:
                # Combine first 3 paragraphs
                content = "\n\n".join([p.get_text() for p in paragraphs[:3]])
        
        # Extract related links (maximum 5)
        related_links = []
        links = bs.find_all("a", href=re.compile("^(/wiki/)"))
        link_count = 0
        for link in links:
            if 'href' in link.attrs and link_count < 5:
                path = link.attrs['href']
                # Include only internal wiki links
                if re.match("^(/wiki/[^:]+$)", path) and (
                    ("Main_Page" not in path and language == "en") or 
                    ("대문" not in path and language == "ko")
                ):
                    related_links.append({
                        "title": link.get_text(),
                        "url": f"https://{language}.wikipedia.org{path}"
                    })
                    link_count += 1
        
        # Return result
        return cls(
            title=title,
            content=content,
            url=url,
            related_links=related_links
        )