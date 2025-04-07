from pydantic import BaseModel
from typing import List

class WikipediaDetailResult(BaseModel):
    title: str
    content: str
    url: str
    related_links: List[dict] = []