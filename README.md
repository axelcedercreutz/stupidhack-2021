# stupidhack-2021

Project for StupidHack 2021

## backend

`curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -`

`source $HOME/.poetry/env`

`cd back`

`poetry install`

`poetry run python app.py`

## frontend

`cd front`

`yarn install`

`yarn start`


## mongodb

1) setup mongo on your computer

2) run `mongod`

if that doesn't work, create in your root a folder "db" within "data"

3) run `mongod --dbpath ~/data/db`