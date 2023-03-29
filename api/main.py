from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from queries.users import UserRepository
from routers import accounts
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "year": 2012,
            "month": 12,
            "day": "9",
            "hour": 19,
            "min": 0,
            "tz:": "PST"
        }
    }


app.include_router(accounts.router, tags=['Users'])
app.include_router(authenticator.router, tags=['Users'])


