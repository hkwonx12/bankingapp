from fastapi.testclient import TestClient
from main import app
from queries.users import UserRepository
from authenticator import authenticator

client = TestClient(app)

class FakeUsersQueries:
     def get_all_user_accounts(self):
        return [
            {
                "id": 1,
                "email": "user1@user1.com",
                "full_name": "user1",
                "username": "string",
                "hashed_password": "string",
                "address": "string",
                "phone": "string",
                "dob": "1990-10-23"
            }
        ]

def fake_get_current_account_data():
        return {
            "id": int
        }

def test_get_all_savings_accounts():
    # Arrange
    app.dependency_overrides[UserRepository] = FakeUsersQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    # Act
    res = client.get('/api/all_users')
    data = res.json()
    # Assert
    assert res.status_code == 200
    assert len(data) == 1
    # A Cleanup
    app.dependency_overrides = {}
