import uvicorn

from typing import Optional

import pymongo
from bson.objectid import ObjectId

from fastapi import FastAPI, HTTPException, Body, Request
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
    username: str
    password: str
    nocccoins: int = 0


# Helpers
def _set_nocccoins(user_id: str, amount: int):
    res = db.users.update_one({ '_id': ObjectId(user_id) }, { "$set": { "nocccoins": amount } })
    return res


# Endpoints 
@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/users/")
def post_user(user: User):
    u = db.users.insert_one(user.dict())
    return str(u.inserted_id)


@app.get("/users/find")
def get_user(username: str = ''):
    u = db.users.find_one({ 'username': username })
    return {**u, '_id': str(u['_id'])}


@app.get("/users/{user_id}")
def get_user(user_id: str):
    u = db.users.find_one({ '_id': ObjectId(user_id) })
    return {**u, '_id': str(u['_id'])}


@app.post("/nocccoins/transfer")
def send_noccoins(from_id: str = Body(...), password: str = Body(...), to_id: str = Body(...), amount: int = Body(...)):
    from_u = db.users.find_one({ '_id': ObjectId(from_id) })
    if not from_u['password'] == password:
        raise HTTPException(status_code=401, detail="No permission")
    if from_u['nocccoins'] < amount:
        raise HTTPException(status_code=403, detail="Not enough nocccoins")
    to_u = db.users.find_one({ '_id': ObjectId(to_id) })
    _set_nocccoins(from_id, from_u['nocccoins'] - amount)
    _set_nocccoins(to_id, to_u['nocccoins'] + amount)
    return get_user(from_id)


@app.post("/nocccoins/add")
def send_noccoins(to_id: str = Body(...), amount: int = Body(...)):
    to_u = db.users.find_one({ '_id': ObjectId(to_id) })
    _set_nocccoins(to_id, to_u['nocccoins'] + amount)
    return get_user(to_id)


def main():
    print("Hello World")
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True, workers=2)


if __name__ == "__main__":
    main()