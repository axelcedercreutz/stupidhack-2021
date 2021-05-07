import uvicorn

from typing import Optional

import pymongo

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

client = pymongo.MongoClient("localhost", 27017)
db = client.nocccoin

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# TODO: replace with db
users = []


class User(BaseModel):
    user_id: int
    nickname: str
    password: str


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/users/")
def read_root(user: User):
    users.append(user)
    return user


@app.get("/users/{user_id}")
def read_root(user_id: int):
    return next((user for user in users if user.user_id == user_id))


def main():
    print("Hello World")
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True, workers=2)

if __name__ == "__main__":
    main()