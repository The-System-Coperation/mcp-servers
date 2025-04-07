from typing import List, Optional
from pydantic import BaseModel, Field

class WikipediaSearchRequest(BaseModel):
    """
    위키피디아 고급 검색을 위한 요청 모델
    
    - plain: 포함할 단어 목록 (이 단어)
    - phrase: 정확히 일치해야 하는 문구 (이 문자와 정확히 일치)
    - not_words: 제외할 단어 목록 (이 단어 제외)
    - or_words: 선택적 단어 목록 (이 단어 중 하나)
    - search_query: 일반 검색어
    - language: 검색할 언어 코드 (기본값: en)
    """
    
    plain: Optional[List[str]] = Field(default=None, description="이 단어를 포함")
    phrase: Optional[str] = Field(default=None, description="이 문구와 정확히 일치")
    not_words: Optional[List[str]] = Field(default=None, description="이 단어 제외")
    or_words: Optional[List[str]] = Field(default=None, description="이 단어 중 하나 포함")
    search_query: Optional[str] = Field(default=None, description="일반 검색어")
    language: str = Field(default="en", description="검색할 언어 코드")
    
    def to_search_query(self) -> str:
        """
        검색 요청을 위키피디아 검색 쿼리 문자열로 변환
        """
        query_parts = []
        
        # 일반 검색어 추가
        if self.search_query:
            query_parts.append(self.search_query)
        
        # 이 단어 (plain)
        if self.plain:
            query_parts.extend(self.plain)
        
        # 정확히 일치하는 문구 (phrase)
        if self.phrase:
            query_parts.append(f'"{self.phrase}"')
        
        # 제외할 단어 (not_words)
        if self.not_words:
            query_parts.extend([f'-{word}' for word in self.not_words])
        
        # 선택적 단어 (or_words)
        if self.or_words and len(self.or_words) > 1:
            or_query = " OR ".join(self.or_words)
            query_parts.append(f'({or_query})')
        elif self.or_words and len(self.or_words) == 1:
            query_parts.append(self.or_words[0])
        
        return " ".join(query_parts) 