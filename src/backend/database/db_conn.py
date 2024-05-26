import psycopg2


class PostgreSQLConnection:
    def __init__(self, dbname, user, password, host, port):
        self.dbname = dbname
        self.user = user
        self.password = password
        self.host = host
        self.port = port
        self.connection = None
        self.cursor = None

    def connect(self):
        try:
            self.connection = psycopg2.connect(
                dbname=self.dbname,
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
            )
            self.cursor = self.connection.cursor()
            print("Connected to the database.")
        except Exception as e:
            print(f"Error: Unable to connect to the database. {e}")

    def disconnect(self):
        if self.connection:
            self.connection.close()
            print("Disconnected from the database.")
