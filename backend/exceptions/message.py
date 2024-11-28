from fastapi import HTTPException


class MessageAlreadyExists(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=400,
            detail="Message already exists",
        )
        

class MessageNotFound(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=404,
            detail="Message not found",
        )