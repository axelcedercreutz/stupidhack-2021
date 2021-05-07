import uvicorn

from typing import Optional

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


def main():
    print("Hello World")
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True, workers=2)

if __name__ == "__main__":
    main()