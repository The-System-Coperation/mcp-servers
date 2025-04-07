from typing import List, Optional
from pydantic import BaseModel, Field

class WikipediaDetailResult(BaseModel):
    """
    위키피디아 상세 페이지 정보
    
    - title: 위키피디아 페이지 제목
    - content: 페이지 내용
    - url: 위키피디아 페이지 URL
    - related_links: 관련 페이지 링크 목록
    """
    
    title: str = Field(description="위키피디아 페이지 제목")
    content: str = Field(description="위키피디아 페이지 내용")
    url: str = Field(description="위키피디아 페이지 URL")
    related_links: List[dict] = Field(default_factory=list, description="관련 페이지 링크 목록")