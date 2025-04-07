
from pydantic import BaseModel

class WikipediaSearchResult(BaseModel):
    title: str
    content: str
    url: str