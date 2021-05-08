import base64
from datetime import datetime

from typing import Optional
from bson.objectid import ObjectId

import uvicorn
import pymongo

from fastapi import FastAPI, HTTPException, Body, Request, File
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import cv2 
import numpy as np

from draw_reference import draw_borders
from validate_image import validate_image
import nocoaly

import hashlib
import os

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
    username: str = ''
    salt: str = base64.b64encode(os.urandom(32))
    hashed_password: str = ''
    nocccoins: int = 0
    flavours: list = []

# Helpers
def _set_nocccoins(user_id: str, amount: int):
    res = db.users.update_one({ '_id': ObjectId(user_id) }, { "$set": { "nocccoins": amount } })
    return res


def _set_flavours(user_id: str, flavours: list):
    res = db.users.update_one({ '_id': ObjectId(user_id) }, { "$set": { "flavours": list(set(flavours)) } })
    return res

def hash(plain_password, salt):
    return base64.b64encode(hashlib.pbkdf2_hmac(
    'sha256', # The hash digest algorithm for HMAC
    plain_password.encode('utf-8'), # Convert the password to bytes
    salt, # Provide the salt
    100000, # It is recommended to use at least 100,000 iterations of SHA-256
    dklen=128 # Get a 128 byte key
    ))

# Endpoints 
@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/users")
def post_user(username: str = Body(...), password: str = Body(...)):
    user = User()
    user.username = username
    user.hashed_password = hash(password, user.salt)
    u = db.users.insert_one(user.dict())
    return str(u.inserted_id)


@app.get("/users")
def get_users():
    users = db.users.find()
    return [{ '_id': str(u['_id']), 'username': u['username'] } for u in list(users)]


@app.get("/users/find")
def find_user(username: str = ''):
    u = db.users.find_one({ 'username': username })
    # TODO: only return public data
    #return {**u, '_id': str(u['_id'])}
    return {'username': str(u['username']), 'nocccoins': str(u['nocccoins']), 'flavours': str(u['flavours']), '_id': str(u['_id'])}


@app.post("/users/login")
def login_user(username: str = Body(...), password: str = Body(...)):
    u = db.users.find_one({ 'username': username })
    if not u:
        raise HTTPException(status_code=404, detail="No user")
    if u['hashed_password'] != hash(password, u['salt']):
        raise HTTPException(status_code=401, detail="No permission")
    #return {**u, '_id': str(u['_id'])}
    return {'username': str(u['username']), 'nocccoins': str(u['nocccoins']), 'flavours': str(u['flavours']), '_id': str(u['_id'])}


@app.get("/users/{user_id}")
def get_user(user_id: str):
    u = db.users.find_one({ '_id': ObjectId(user_id) })
    # TODO: only return public data
    #return {**u, '_id': str(u['_id'])}
    return {'username': str(u['username']), 'nocccoins': str(u['nocccoins']), 'flavours': str(u['flavours']), '_id': str(u['_id'])}


@app.get("/nocccoins/transfers")
def get_transfers(from_id: str = '', to_id: str = '', transfer_id: str = ''):
    if transfer_id:
        transfer = db.transfers.find_one({ '_id': ObjectId(transfer_id) })
        return {**transfer, '_id': str(transfer['_id'])}
    query = {}
    if from_id:
        query['from_id'] = from_id
    if to_id:
        query['to_id'] = to_id
    transfers = db.transfers.find(query)
    return [{ **u, '_id': str(u['_id']) } for u in list(transfers)]


@app.post("/nocccoins/transfers")
def transfer_nocccoins(from_id: str = Body(...), password: str = Body(...), to_id: str = Body(...), amount: int = Body(...), message: str = Body('')):
    from_u = db.users.find_one({ '_id': ObjectId(from_id) })
    if from_u['hashed_password'] != hash(password, u['salt']):
        raise HTTPException(status_code=401, detail="No permission")
    if from_u['nocccoins'] < amount:
        raise HTTPException(status_code=403, detail="Not enough nocccoins")
    to_u = db.users.find_one({ '_id': ObjectId(to_id) })
    _set_nocccoins(from_id, from_u['nocccoins'] - amount)
    _set_nocccoins(to_id, to_u['nocccoins'] + amount)
    t = db.transfers.insert_one({ 'from_id': from_id, 'to_id': to_id, 'message': message, 'timestamp': datetime.utcnow() })
    transfer = db.transfers.find_one({ '_id': t.inserted_id })
    return {**transfer, '_id': str(transfer['_id'])}


@app.post("/nocccoins/add")
def add_nocccoins(user_id: str = Body(...), amount: int = Body(...)):
    to_u = db.users.find_one({ '_id': ObjectId(user_id) })
    _set_nocccoins(user_id, to_u['nocccoins'] + amount)
    return get_user(user_id)

@app.get("/nocccoins/mine")
def get_mine_challenge():
    return FileResponse('reference.png')

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
    try:
        im_bytes = base64.b64decode(image)
        im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
        image_file = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    except:
        raise HTTPException(status_code=400, detail="Invalid image")

    # TODO: return censored image

    if not validate_image(image_file):
        raise HTTPException(status_code=400, detail="Invalid chain")
    
    # TODO: Use censored image to find noccos 

    flavours = nocoaly.find_noccos(im_bytes) 
    print(flavours)

    if len(flavours) == 0:
        raise HTTPException(status_code=400, detail="Nocco not found")

    user = db.users.find_one({ '_id': ObjectId(user_id) })
    _set_nocccoins(user_id, user['nocccoins'] + len(flavours))
    _set_flavours(user_id, user['flavours'] + flavours)
    noccchain_id = db.noccchain.count() + 1
    mined = db.noccchain.insert_one({ 'noccchain_id': noccchain_id, 'user_id': user_id })

    bordered_image = draw_borders(image_file)
    cv2.imwrite('reference.png', bordered_image)
    with open(f"noccchain/{noccchain_id}.png", "wb") as fh:
        fh.write(base64.decodebytes(image))
    
    return get_nocccoin(noccchain_id)


@app.get("/noccchain/length")
def get_noccchain_length():
    return db.noccchain.count()


@app.get("/noccchain/{noccci_id}")
def get_noccchain_nocccblock(noccci_id: int = 0):
    noccchain_length = db.noccchain.count()
    print('->', noccchain_length)
    if noccci_id > noccchain_length:
        raise HTTPException(status_code=404, detail="Nocccblock not found")
    return FileResponse(f'noccchain/{noccci_id}.png')


def main():
    print("Hello World")
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True, workers=2)


if __name__ == "__main__":
    main()
