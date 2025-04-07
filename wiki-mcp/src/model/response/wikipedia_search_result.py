from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field, HttpUrl

class WikipediaSearchResultItem(BaseModel):
    """
    위키피디아 검색 결과 항목
    
    - title: 검색 결과 제목
    - detail: 상세 내용
    """
    
    title: str = Field(description="검색 결과 제목")
    detail: str = Field(description="검색 결과 상세 내용")

class WikipediaSearchResults(BaseModel):
    """
    위키피디아 검색 결과 목록
    - results: 검색 결과 목록
    """
    results: List[WikipediaSearchResultItem] = Field(default_factory=list, description="검색 결과 목록") 