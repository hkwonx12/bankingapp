import requests
import os

STOCK_API_KEY=os.environ['STOCK_API_KEY']

class StockQueries:
    base_url = 'https://finnhub.io/api/v1/quote?symbol='
    def get_stock_by_name(self, stock: str):
        res = requests.get(self.base_url + f'{stock}&token={STOCK_API_KEY}')
        return res.json()
