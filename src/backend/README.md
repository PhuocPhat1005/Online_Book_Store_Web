# About Server
## 1. Introduction
This is the backend server for the project. It is built using FastAPI (Python). It is responsible for handling all the API requests and interacting with the database.
## 2. Getting Started
### 2.1. **Prerequisites**
* Python 3.9 or higher must be installed
* PostgreSQL must be installed and running
### 2.2. **Installation**
1. Clone the repository
2. Do the following:
3. Create a virtual environment
4. Activate the virtual environment
5. Set the environment variables in the `.env` file including:
* `DATABASE_URL` - the URL of the PostgreSQL database (Password, Account, Host, Port, Database)
* `SECRET_KEY` - a secret key for the FastAPI app
* `JWT_SECRET` - a secret key for the JWT token
6. Install all packages
```Python!=
    pip install -r requirements.txt
```
7. Run server using the following command
```Python!=
    uvicorn main:app --reload
```
