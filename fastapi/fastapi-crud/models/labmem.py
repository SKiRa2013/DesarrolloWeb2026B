from pydantic import BaseModel
from typing import Text, Optional

from datetime import datetime

class PostLabMem(BaseModel):
    name: str
    alias: str
    age: int
    dob: datetime
    description: Text
    img: str

    # created_at: datetime = datetime.now()

class UpdateLabMem(BaseModel):
    name: Optional[str] = None
    alias: Optional[str] = None
    age: Optional[int] = None
    dob: Optional[datetime] = None
    description: Optional[Text] = None
    img: Optional[str] = None

    # created_at: datetime = datetime.now()
