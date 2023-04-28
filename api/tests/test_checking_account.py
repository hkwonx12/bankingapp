from fastapi.testclient import TestClient
from main import app
from queries.checking_account import CheckingAccountRepository
from authenticator import authenticator

client = TestClient(app)


class FakeCheckingQuries:
    def get_all_checking_accounts(self):
        return [
            {
                "id": 0,
                "account_number": 0,
                "owner_id": 0
            }
        ]


def fake_get_current_account_data():
    return {
        id: int
    }


def test_get_all_checking_accounts():

    app.dependency_overrides[CheckingAccountRepository] = FakeCheckingQuries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    res = client.get('/api/checking_account')
    data = res.json()

    assert res.status_code == 200
    assert len(data["checking_account"]) == 1

    app.dependency_overrides = {}
