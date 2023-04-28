from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from queries.users import UserRepository
from routers import users, savings_account, checking_account, investment_account, transactions, stock_info
import os


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get(
            "CORS_HOST", "http://localhost:3000"), "http://localhost:8000"
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



app.include_router(users.router, tags=['Users'])
app.include_router(authenticator.router, tags=['Users'])
app.include_router(savings_account.router, tags=['Savings'])
app.include_router(checking_account.router, tags=['Checking Account'])
app.include_router(investment_account.router, tags=['Investment Account'])
app.include_router(transactions.router, tags=['Transactions'])
app.include_router(stock_info.router, tags=['Stock Info'])
