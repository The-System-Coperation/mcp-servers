# server.py

from mcp.server.fastmcp import FastMCP
import re
import json
from datetime import datetime
from urllib.request import urlopen, Request
from urllib.parse import quote, urlencode
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
    위키피디아 고급 검색을 수행합니다.
    
    Args:
        query: 위키피디아 검색 요청 모델
    
    Returns:
        WikipediaSearchResults: 검색 결과 목록
    """
    # 검색 쿼리 생성
    search_query = query.to_search_query()
    if not search_query.strip():
        return WikipediaSearchResults(results=[])
    
    # URL 인코딩
    encoded_query = quote(search_query)
    language = query.language
    
    # 고급 검색 필드 JSON 생성
    advanced_fields = {"fields": {}}
    
    # 빈 값이 아닌 필드만 추가
    if query.plain:
        advanced_fields["fields"]["plain"] = query.plain
    
    if query.phrase:
        advanced_fields["fields"]["phrase"] = query.phrase
    
    if query.not_words:
        advanced_fields["fields"]["not"] = query.not_words
    
    if query.or_words:
        advanced_fields["fields"]["or"] = query.or_words
    
    # 고급 검색 필드 JSON 인코딩
    advanced_search_json = json.dumps(advanced_fields)
    encoded_advanced_search = quote(advanced_search_json)
    
    # 기본 URL 파라미터
    params = {
        "search": encoded_query,
        "title": "특수:검색",
        "profile": "advanced",
        "fulltext": "1",
        "ns0": "1"
    }
    
    # 고급 검색 필드가 있는 경우만 추가
    if advanced_fields["fields"]:
        params["advancedSearch-current"] = encoded_advanced_search
    
    # URL 생성
    url_params = "&".join([f"{k}={v}" for k, v in params.items()])
    search_url = f"https://{language}.wikipedia.org/w/index.php?{url_params}"
    
    try:
        # 사용자 에이전트 설정
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko)'}
        request = Request(search_url, headers=headers)
        
        # 검색 결과 페이지 가져오기
        html = urlopen(request)
        bs = BeautifulSoup(html, "html.parser")
        
        # 검색 결과 추출
        search_results = []
        
        # 검색 결과 항목 추출
        result_items = bs.find_all("li", {"class": "mw-search-result"})
        
        for item in result_items:
            # 제목 추출
            title_elem = item.find("div", {"class": "mw-search-result-heading"})
            title = title_elem.get_text().strip() if title_elem else "제목 없음"
            
            # 내용 추출
            detail_elem = item.find("div", {"class": "searchresult"})
            detail = ""
            if detail_elem:
                # HTML 태그 포함하여 내용 추출 (span 태그가 있을 수 있음)
                detail = str(detail_elem)
                # HTML 태그 제거 필요시 아래 코드로 변경
                # detail = detail_elem.get_text().strip()
            
            # 검색 결과 항목 추가
            search_results.append(
                WikipediaSearchResultItem(
                    title=title,
                    detail=detail
                )
            )
        
        # 결과 반환
        return WikipediaSearchResults(results=search_results)
    
    except Exception as e:
        # 오류 발생 시 빈 결과 반환
        return WikipediaSearchResults(results=[])









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
