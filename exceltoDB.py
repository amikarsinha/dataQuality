import pandas as pd
import pyodbc
from sqlalchemy import create_engine

def excel_to_sql(excel_file, table_name, user, password, host, port, database):
    # Read the CSV file into a Pandas DataFrame
    df = pd.read_excel(excel_file,sheet_name='Sheet1')
    # print(df)
    # Create the database URL for SQLAlchemy
    # database_url = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}'
    # connection_string = f'mssql+pyodbc://nirbhay:admin@1234@tcp:dq-sql-server.database.windows.net,1433/exception_database?driver=ODBC+Driver+17+for+SQL+Server'
    database_url = '{ODBC Driver 17 for SQL Server};Server=tcp:dq-sql-server.database.windows.net,1433;Database=exception_database;Uid=nirbhay;Pwd=admin@1234;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;'
    
    # Create an SQLAlchemy engine
    engine = create_engine(database_url)
    try:
        # Connect to the database and return the connection engine
        connection = engine.connect()
        print("Connected to Azure SQL Database successfully!")
        return engine
    except Exception as e:
        print("Error connecting to Azure SQL Database:", str(e))
        return None

    # Write the DataFrame to the SQL database
    df.to_sql(table_name, engine, if_exists='replace', index=False)
    
    print(f"Data from {excel_file} has been stored in the '{table_name}' table of the database.")

# Example usage:
excel_file = 'C:\\Users\\Sahil Agarwal\\Desktop\\Innovation Fair\\250k_AS_dataset.xlsx'  # Replace with your CSV file path
table_name = 'new_dataset'  # Replace with your desired table name
user = 'root'
password = 'admin'
host = 'localhost'
port = 3306
database = 'exception_database'

excel_to_sql(excel_file, table_name, user, password, host, port, database)
