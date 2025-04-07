# server.py

from mcp.server.fastmcp import FastMCP
import re
from urllib.request import urlopen
from urllib.parse import quote
from bs4 import BeautifulSoup
from model.wikipedia_detail import WikipediaDetailResult

mcp = FastMCP(
    name = "wiki-mcp",
    dependencies=["bs4"]
)


@mcp.tool()
def search_wekipedia(query: str) -> str:
    """위키피디어 키워드 검색"""
    return f"Searching for {query} on Wikipedia..."

# detail 검색

@mcp.tool()
def search_wikipedia_detail(query: str, language: str = "en") -> WikipediaDetailResult:
    """
    위키피디아 페이지 상세 내용을 가져옵니다.
    
    Args:
        query: 위키피디아 페이지 제목 또는 검색어
        language: 위키피디아 언어 코드 (기본값: "en", 한국어: "ko")
    
    Returns:
        WikipediaDetailResult: 제목, 내용, URL을 포함한 위키피디아 상세 정보
    """
    # 쿼리 문자열을 URL에 맞게 인코딩
    encoded_query = quote(query.replace(' ', '_'))
    
    # 위키피디아 URL 생성
    url = f"https://{language}.wikipedia.org/wiki/{encoded_query}"
    
    try:
        # 페이지 가져오기
        html = urlopen(url)
        bs = BeautifulSoup(html, "html.parser")
        
        # 제목 추출
        title = bs.h1.get_text() if bs.h1 else query
        
        # 내용 추출 (첫 번째 문단)
        content = ""
        bodyContent = bs.find("div", {"id": "bodyContent"})
        if bodyContent:
            paragraphs = bodyContent.find_all("p")
            if paragraphs:
                # 첫 3개 문단 내용 합치기
                content = "\n\n".join([p.get_text() for p in paragraphs[:3]])
        
        # 관련 링크 추출 (최대 5개)
        related_links = []
        links = bs.find_all("a", href=re.compile("^(/wiki/)"))
        link_count = 0
        for link in links:
            if 'href' in link.attrs and link_count < 5:
                path = link.attrs['href']
                # 내부 위키 링크만 포함
                if re.match("^(/wiki/[^:]+$)", path) and (
                    ("Main_Page" not in path and language == "en") or 
                    ("대문" not in path and language == "ko")
                ):
                    related_links.append({
                        "title": link.get_text(),
                        "url": f"https://{language}.wikipedia.org{path}"
                    })
                    link_count += 1
        
        # 결과 반환
        return WikipediaDetailResult(
            title=title,
            content=content,
            url=url,
            related_links=related_links
        )
    
    except Exception as e:
        # 오류 발생 시 기본 정보 반환
        return WikipediaDetailResult(
            title=query,
            content=f"페이지를 가져오는 중 오류가 발생했습니다: {str(e)}",
            url=url
        )


def run_server():
    mcp.run()


if __name__ == "__main__":
    run_server()
