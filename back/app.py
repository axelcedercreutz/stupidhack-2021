import base64

from typing import Optional
from bson.objectid import ObjectId

import uvicorn
import pymongo

from fastapi import FastAPI, HTTPException, Body, Request, File
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


@app.get("/users/")
def get_users():
    users = db.users.find()
    return [{ '_id': str(u['_id']), 'username': u['username'] } for u in list(users)]


@app.get("/users/find")
def find_user(username: str = ''):
    u = db.users.find_one({ 'username': username })
    # TODO: only return public data
    return {**u, '_id': str(u['_id'])}


@app.post("/users/login")
def login_user(username: str = Body(...), password: str = Body(...)):
    u = db.users.find_one({ 'username': username })
    if u['password'] != password:
        raise HTTPException(status_code=401, detail="No permission")
    return {**u, '_id': str(u['_id'])}


@app.get("/users/{user_id}")
def get_user(user_id: str):
    u = db.users.find_one({ '_id': ObjectId(user_id) })
    # TODO: only return public data
    return {**u, '_id': str(u['_id'])}


@app.post("/nocccoins/transfer")
def transfer_nocccoins(from_id: str = Body(...), password: str = Body(...), to_id: str = Body(...), amount: int = Body(...)):
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
def add_nocccoins(user_id: str = Body(...), amount: int = Body(...)):
    to_u = db.users.find_one({ '_id': ObjectId(user_id) })
    _set_nocccoins(user_id, to_u['nocccoins'] + amount)
    return get_user(user_id)


@app.get("/nocccoins/{noccchain_id}")
def get_nocccoin(noccchain_id: int):
    u = db.noccchain.find_one({ 'noccchain_id': noccchain_id })
    return {**u, '_id': str(u['_id'])}


@app.post("/nocccoins/mine")
def mine_nocccoins(user_id: str = Body(...), image: bytes = Body(...)):
    # Kuvan normalisointi jos frontti ei tee sitä
    # Ollin koodille --> Onko kuvassa QR koodi --> status (ja kuva) takaisin
    # Kuva (ollin tai original) leilalle --> status, mikä nocco
    # Jos molemmat ok, tallennetaan kuva ja lisätään noccchainiin
    # Jos ei niin hv
    # Note: pyyntöjen jonotus / lock
    # Userille flavour (set)
    # Noccchain --> id, user_id
    flavors = [1] # TODO: replace with Leila's code
    if len(flavors) == 0:
        raise HTTPException(status_code=404, detail="Nocco not found")
    add_nocccoins(user_id)
    noccchain_id = db.noccchain.count() + 1
    mined = db.noccchain.insert_one({ 'noccchain_id': noccchain_id, 'user_id': user_id })
    with open(f"noccchain/{noccchain_id}.png", "wb") as fh:
        fh.write(base64.decodebytes(image))
    
    return get_nocccoin(noccchain_id)


def main():
    print("Hello World")
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True, workers=2)


if __name__ == "__main__":
    main()