from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine, inspect

app = Flask(__name__)
CORS(app)

# Database connection details
db_user = 'root'
db_password = 'admin'
db_host = 'localhost'
db_port = 3306
db_name = 'exception_database'

# Global variable to store the DataFrame
dataframes = {}

# Function to load data into a DataFrame
def load_data():
    try:
        engine = create_engine(f'mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}')
        inspector = inspect(engine)
        # Fetch all table names
        tables = inspector.get_table_names()
        for table in tables:
            print(table)
            df = pd.read_sql(f"SELECT * FROM `{table}`", engine)
            dataframes[table] = df
    except Exception as e:
        print(f"Error loading data: {str(e)}")

# Function to describe dataframe
def describe_dataframe3(df):
    table_data = []
    sno = 1
    for column in df.columns:
        col_name = column
        col_dtype = str(df[column].dtype)  # Convert dtype to string
        distinct_values = int(df[column].nunique())  # Convert to Python int
        null_values = int(df[column].isnull().sum())  # Convert to Python int
        table_data.append([sno, col_name, col_dtype, distinct_values, null_values])
        sno += 1
    return table_data

@app.route('/dataProfiling', methods=['GET'])
def search():
    table_name = request.args.get('query')
    if not table_name:
        return jsonify({"error": "Table name is required"}), 400

    try:
        if table_name not in dataframes:
            return jsonify({"error": f"Table '{table_name}' not found"}), 404

        df = dataframes[table_name]
        print(df.head())
        table_data = describe_dataframe3(df)
        for row in table_data:
            print(row)

        return jsonify(table_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/exceptionRules', methods=['GET'])
def getExceptionRules():
    try:
        df_table = 'realpolicyclaimser'
        df = dataframes[df_table]
        print(df.head())
        
        # Convert DataFrame to dictionary
        df_dict = df.to_dict(orient='records')
        
        for row in df_dict:
            print(row)

        return jsonify(df_dict)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    load_data()
    app.run(port=5000)



