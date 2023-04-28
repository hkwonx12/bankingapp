from fastapi import APIRouter, Depends
from models import Stockout
from queries.stock_info import StockQueries

router = APIRouter()


@router.get('/api/stock/{stock}', response_model=Stockout)
def get_stock(
    stock: str,
    queries: StockQueries = Depends()
):
    return queries.get_stock_by_name(stock)
