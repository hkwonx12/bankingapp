from fastapi.testclient import TestClient
from main import app
from queries.investment_account import InvestmentAccountRepository
from authenticator import authenticator

client = TestClient(app)


class FakeInvestmentQueries:
    def get_all_investment_accounts(self, account_data):
        return [
            {
                "id": 1,
                "total_amount": 500,
                "investment_value": 0,
                "owner_id": 1
            }
        ]


def fake_get_current_account_data():
    return {
        "id": 2
    }


def test_get_all_investment_accounts():

    app.dependency_overrides[InvestmentAccountRepository] = FakeInvestmentQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    res = client.get('/api/investment_account')
    data = res.json()

    assert res.status_code == 200
    assert len(data) == 1

    app.dependency_overrides = {}
