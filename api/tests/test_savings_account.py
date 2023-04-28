from fastapi.testclient import TestClient
from main import app
from queries.savings_account import SavingsRepository
from authenticator import authenticator

client = TestClient(app)

class FakeSavingsQueries:
     def get_all_savings_accounts(self, account_data):
        return [
            {
                "id": 1,
                "total_amount": 500,
                "interest_rate": 0,
                "routing_number": 0,
                "owner_id": 1
            }
        ]

def fake_get_current_account_data():
        return {
            "id": 2
        }

def test_get_all_savings_accounts():
    # Arrange
    app.dependency_overrides[SavingsRepository] = FakeSavingsQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    # Act
    res = client.get('/api/savings_account')
    data = res.json()
    # Assert
    assert res.status_code == 200
    assert len(data) == 1
    # A Cleanup
    app.dependency_overrides = {}
