from flask import Flask, request, jsonify
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from datetime import datetime, timedelta
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Database configuration
DATABASE_URI = 'mysql+pymysql://root:admin@localhost:3306/exception_database'
engine = create_engine(DATABASE_URI)
Base = declarative_base()

# Define a model for the table
class ExceptionRule(Base):
    __tablename__ = '250k_new_dataseter'
    
    exception_id = Column(Integer, primary_key=True)
    table_id = Column(Integer, nullable=False)
    Severity = Column(String(50), )
    UniqueKey = Column(String(50), nullable=False)
    company = Column(String(100), nullable=False)
    created_date = Column(DateTime, nullable=False)
    department = Column(String(100), nullable=False)  
    exception_logic_system = Column(String(100), nullable=False)
    exception_name = Column(String(100), nullable=False)
    exception_owner = Column(String(100), nullable=False)
    isactive = Column(Boolean, nullable=False)
    logic = Column(String(255), nullable=False)
    pipeline_stage = Column(String(50), nullable=False)
    source_system_type = Column(String(50), nullable=False)

    def __repr__(self):
        return f'<ExceptionRule {self.exception_name}>'
    
class ExceptionResult(Base):
    __tablename__ = 'exception_result2'
 
    id = Column(Integer, primary_key=True, autoincrement=True)
    primary_key = Column(String(255), nullable=False)
    created_date = Column(DateTime, nullable=False)
    created_time = Column(String(255), nullable=False)   # Change to Time if storing only time
    valid_upto = Column(DateTime, nullable=False)
    exception_id = Column(Integer, nullable=False)
    Severity = Column(String(50), )
    department = Column(String(100), nullable=False)
    isactive = Column(Boolean, nullable=False)
    logic = Column(String(255), nullable=False)



# Create the session
Session = scoped_session(sessionmaker(bind=engine))
session = Session()

# Custom error handler to ensure JSON response
@app.errorhandler(Exception)
def handle_exception(e):
    response = {
        "error": str(e)
    }
    return jsonify(response), 500

# Endpoint to add a new rule
@app.route('/api/rules', methods=['POST'])
def add_rule():
    try:
        # Get data from the request body
        data = request.get_json()
        app.logger.info(f'Received data: {data}')  # Log the received data
        # Create a new rule instance
        new_rule = ExceptionRule(
            table_id=data['table_id'],
            Severity=data['Severity'],
            UniqueKey=data['UniqueKey'],
            company=data['company'],
            created_date=datetime.strptime(data['created_date'], '%a, %d %b %Y %H:%M:%S %Z'),
            department=data['department'],
            exception_id=data['exception_id'],
            exception_logic_system=data['exception_logic_system'],
            exception_name=data['exception_name'],
            exception_owner=data['exception_owner'],
            isactive=bool(data['isactive']),
            logic=data['logic'],
            pipeline_stage=data['pipeline_stage'],
            source_system_type=data['source_system_type']
        )

        # Add the new rule to the session and commit to the database
        session.add(new_rule)
        session.commit()

        return jsonify({"message": "New rule added!", "rule": str(new_rule)}), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/rules/<int:exception_id>', methods=['PUT'])
def update_rule(exception_id):
    try:
        data = request.get_json()
        rule = session.query(ExceptionRule).filter_by(exception_id=exception_id).first()

        if not rule:
            return jsonify({"message": "Rule not found"}), 404

        rule.Severity = data.get('Severity', rule.Severity)
        rule.UniqueKey = data.get('UniqueKey', rule.UniqueKey)
        rule.company = data.get('company', rule.company)
        rule.created_date = datetime.strptime(data['created_date'], '%a, %d %b %Y %H:%M:%S %Z') if 'created_date' in data else rule.created_date
        rule.department = data.get('department', rule.department)
        rule.exception_id = data.get('exception_id', rule.exception_id)
        rule.exception_logic_system = data.get('exception_logic_system', rule.exception_logic_system)
        rule.exception_name = data.get('exception_name', rule.exception_name)
        rule.exception_owner = data.get('exception_owner', rule.exception_owner)
        rule.isactive = bool(data.get('isactive', rule.isactive))
        rule.logic = data.get('logic', rule.logic)
        rule.pipeline_stage = data.get('pipeline_stage', rule.pipeline_stage)
        rule.source_system_type = data.get('source_system_type', rule.source_system_type)

        session.commit()

        return jsonify({"message": "Rule updated!", "rule": str(rule)}), 200
    
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400

# Endpoint to delete a rule
@app.route('/api/rules/<int:exception_id>', methods=['DELETE'])
def delete_rule(exception_id):
    try:
        rule = session.query(ExceptionRule).filter_by(exception_id=exception_id).first()

        if not rule:
            return jsonify({"message": "Rule not found"}), 404

        session.delete(rule)
        session.commit()

        return jsonify({"message": "Rule deleted!"}), 200
    
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400

# Endpoint to retrieve all rules
@app.route('/api/rules', methods=['GET'])
def get_all_rules():
    try:
        rules = session.query(ExceptionRule).all()
        return jsonify([{
            "table_id": rule.table_id,
            "Severity": rule.Severity,
            "UniqueKey": rule.UniqueKey,
            "company": rule.company,
            "created_date": rule.created_date.strftime('%a, %d %b %Y %H:%M:%S %Z'),
            "department": rule.department,
            "exception_id": rule.exception_id,
            "exception_logic_system": rule.exception_logic_system,
            "exception_name": rule.exception_name,
            "exception_owner": rule.exception_owner,
            "isactive": rule.isactive,
            "logic": rule.logic,
            "pipeline_stage": rule.pipeline_stage,
            "source_system_type": rule.source_system_type
        } for rule in rules]), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/dataProfiling', methods=['GET'])
def data_profiling():
    try:
        # table_name = '250k_new_dataset'
        table_name = request.args.get('table_name')
        # print(data)
        # print(data.table_name)
        # print("Hello")
        # Load the data into a DataFrame
        df = pd.read_sql_table(table_name, engine)
        
        # Describe the dataframe
        table_data = []
        sno = 1
        for column in df.columns:
            col_name = column
            col_dtype = str(df[column].dtype)  # Convert dtype to string
            distinct_values = int(df[column].nunique())  # Convert to Python int
            null_values = int(df[column].isnull().sum())  # Convert to Python int
            table_data.append({
                "sno": sno,
                "column_name": col_name,
                "data_type": col_dtype,
                "distinct_values": distinct_values,
                "null_values": null_values
            })
            sno += 1

        return jsonify(table_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# get all exception records
@app.route('/api/executeRules', methods=['GET'])
def get_all_rules_ExecuteRules():
    try:
        rules = session.query(ExceptionRule).all()
        return jsonify([{
            "table_id": rule.table_id,
            "Severity": rule.Severity,
            "UniqueKey": rule.UniqueKey,
            "company": rule.company,
            "created_date": rule.created_date.strftime('%a, %d %b %Y %H:%M:%S %Z'),
            "department": rule.department,
            "exception_id": rule.exception_id,
            "exception_logic_system": rule.exception_logic_system,
            "exception_name": rule.exception_name,
            "exception_owner": rule.exception_owner,
            "isactive": rule.isactive,
            "logic": rule.logic,
            "pipeline_stage": rule.pipeline_stage,
            "source_system_type": rule.source_system_type
        } for rule in rules]), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Custom error handler to ensure JSON response
@app.errorhandler(Exception)
def handle_exception(e):
    response = {
        "error": str(e)
    }
    return jsonify(response), 500

# Endpoint to execute the rules and store the results
@app.route('/api/execute_rule', methods=['POST'])
def execute_rule():
    try:
        data = request.get_json()
        # app.logger.info(f'Received data: {data}')
        # print(data)
        # print(data.get('exception_id'))
        # print("Hello")
        # Check if the input data is a list
        # if not isinstance(data, list):
        #     return jsonify({"error": "Invalid input format, expected a list of JSON objects"}), 400
        exception_id = data.get('exception_id')
        logic = data.get('logic')
        department = data.get('department')
        Severity = data.get('Severity')
        isactive = data.get('isactive')
        print(data.get('created_date'))
        # Extract and strip the date string
 
        created_date_str = data.get('created_date', '').strip()
 
    # Convert the cleaned string to a datetime object
        try:
            created_date = datetime.strptime(created_date_str, '%a, %d %b %Y %H:%M:%S')
        except ValueError as e:
            return jsonify({"error": f"Invalid date format: {e}"}), 400
        created_date = created_date
        print(created_date)

        # If Rules is Inactive
        if(isactive == 0):
            try:
                session.query(ExceptionResult).filter(ExceptionResult.exception_id.in_([exception_id])).update(
                    {ExceptionResult.isactive: False}, synchronize_session=False
                )
                # Commit the changes
                session.commit()
                print("Rows updated successfully.")
                return jsonify({"message": "The record is in Inactive state and exceptions records are updated accordingly"}), 200
            except Exception as e:
                # Rollback in case of any error
                # session.rollback()
                print(f"An error occurred: {e}")
            return jsonify({"message": "The record is in Inactive state and exceptions records are updated accordingly"}), 200
       
        # If Rule Already Exists and Just need valid_upto update
        exception_rec = pd.read_sql_query(f'SELECT * FROM exception_result2',engine)
        if( exception_rec['exception_id'].isin([exception_id]).any() ) :
            # update_exist = f""" UPDATE exception_result2
            #     SET valid_upto = datetime.now().date()
            #     WHERE exception_id = {exception_id};
            # """
            # print("Present")
            session.query(ExceptionResult).filter(ExceptionResult.exception_id.in_([exception_id])).update({ExceptionResult.valid_upto: datetime.now().date()}, synchronize_session=False
            )
            session.commit()
            return jsonify({"message": "Rule Executed"})      
        # if not exception_id or not logic:
        #     return jsonify({"error": "Both 'exception_id' and 'logic' are required in each item"}), 400
        print("Hello")
        result_df = pd.read_sql_query(logic, engine)
        print(result_df)
        s_no = 1
        for _, row in result_df.iterrows():
            primary_key = row['PolicyId']  # Assuming 'id' is the primary key of the `250k_new_dataset` table
            # valid_upto = str(datetime.now().date().strftime('%Y-%m-%d'))
            valid_upto = datetime.now().date()
            # valid_upto = '2024-08-10 00:00:00'
            # valid_upto = datetime.strptime(, '%a, %d %b %Y %H:%M:%S %Z')
            created_time = str(datetime.now().time())
            # print(len(created_time))
            # print(primary_key + "," + created_date  + ", " + created_time + ", " + created_time)
            s_no = s_no + 1
            print(valid_upto)
            print("Adding exception result to db")
            # Store the result in the ExceptionResult table
            result_record = ExceptionResult(
                primary_key = primary_key,
                created_date = created_date,
                created_time = created_time,  # Store formatted time string
                valid_upto = valid_upto,
                exception_id = exception_id,
                department = department,
                Severity = Severity,
                isactive = isactive,
                logic = logic
            )
           
            session.add(result_record)
            # print(valid_upto)
            # print(logic)
            print("Completed adding exception result to db")
        print("Commiting exception result to db")
        session.commit()
        print("Commited exception result to db")
        return jsonify({"message": "Logic executed and results stored successfully!"}), 200
 
    except Exception as e:
        # session.rollback()
        return jsonify({"error": str(e)}), 400

# Get all results for exception records
# @app.route('/api/exception_results', methods=['GET'])
# def get_all_exception_results():
#     try:
#         # Query all records from the exception_result table
#         results = session.query(ExceptionResult).all()

#         # Serialize the query results into a list of dictionaries
#         result_list = [{
#             "id": result.id,
#             "primary_key": result.primary_key,
#             "created_date": result.created_date,
#             "created_time": result.created_time,
#             "exception_id": result.exception_id,
#             "logic": result.logic
#         } for result in results]

#         return jsonify(result_list), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400
    


@app.route('/api/records-vs-id', methods=['GET'])
def create_records_vs_id_Graph():
    session = Session()
    try:
        # Use a GROUP BY query to count records for each exception_id
        exception_counts = (
            session.query(
                ExceptionResult.exception_id, 
                func.count(ExceptionResult.id).label('count')
            )
            .group_by(ExceptionResult.exception_id)
            .all()
        )
        
        # Prepare the response data
        result = [
            {'exception_id': exc_id, 'count': count}
            for exc_id, count in exception_counts
        ]
        
        # Return the data as JSON
        return jsonify(result)

    except Exception as e:
        # Print the error to the console for debugging
        print(f"Error occurred: {e}")
        session.rollback()
        # Return a JSON response indicating an internal server error
        return jsonify({'error': 'An internal server error occurred.'}), 500

    finally:
        # session.close()
        Session.remove()



@app.route('/api/records-vs-severity', methods=['GET'])
def create_records_vs_severity_Graph():
    session = Session()
    try:
        # Use a GROUP BY query to count records for each severity level
        severity_counts = (
            session.query(
                ExceptionResult.Severity, 
                func.count(ExceptionResult.id).label('count')
            )
            .group_by(ExceptionResult.Severity)
            .all()
        )
        
        # Prepare the response data
        result = [
            {'severity': severity, 'count': count}
            for severity, count in severity_counts
        ]
        
        # Return the data as JSON
        return jsonify(result)

    except Exception as e:
        # Print the error to the console for debugging
        print(f"Error occurred: {e}")
        session.rollback()
        # Return a JSON response indicating an internal server error
        return jsonify({'error': 'An internal server error occurred.'}), 500

    finally:
        Session.remove()


@app.route('/api/records-vs-department', methods=['GET'])
def create_records_vs_department_Graph():
    session = Session()
    try:
        # Use a GROUP BY query to count records for each department
        department_counts = (
            session.query(
                ExceptionResult.department, 
                func.count(ExceptionResult.id).label('count')
            )
            .group_by(ExceptionResult.department)
            .all()
        )
        
        # Prepare the response data
        result = [
            {'department': dept, 'count': count}
            for dept, count in department_counts
        ]
        
        # Return the data as JSON
        return jsonify(result)

    except Exception as e:
        # Print the error to the console for debugging
        print(f"Error occurred: {e}")
        session.rollback()
        # Return a JSON response indicating an internal server error
        return jsonify({'error': 'An internal server error occurred.'}), 500

    finally:
        Session.remove()




@app.route('/api/records-vs-state', methods=['GET'])
def create_records_vs_state_Graph():
    session = Session()
    try:
        # Use a GROUP BY query to count records for each department
        isactive_counts = (
            session.query(
                ExceptionResult.isactive, 
                func.count(ExceptionResult.id).label('count')
            )
            .group_by(ExceptionResult.isactive)
            .all()
        )
        
        # Prepare the response data
        result = [
        {'status': 'NotActive' if not isActive else 'Active', 'count': count}
        for isActive, count in isactive_counts
    ]
        
        # Return the data as JSON
        return jsonify(result)

    except Exception as e:
        # Print the error to the console for debugging
        print(f"Error occurred: {e}")
        session.rollback()
        # Return a JSON response indicating an internal server error
        return jsonify({'error': 'An internal server error occurred.'}), 500

    finally:
        Session.remove()

@app.route('/count-rows-day', methods=['GET'])
def count_rows_by_day():
    # Get the current date and time
    try:
        now = datetime.utcnow()
 
        # Query to get the minimum created_date from the table
        min_date = session.query(func.min(ExceptionResult.created_date)).scalar()
 
        # If there are no records, return an empty result
        if not min_date:
            return jsonify({"message": "No data available"}), 404
 
        # Query to count rows grouped by day
        # results = session.query(
        #     func.date(ExceptionResult.created_date).label('date'),
        #     func.count().label('count')
        # ).filter(
        #     ExceptionResult.created_date >= min_date,
        #     ExceptionResult.created_date <= now
        # ).group_by(
        #     func.date(ExceptionResult.created_date)
        # ).all()
 
        df = pd.read_sql_query(f'SELECT * FROM  exception_result2',engine)
        df['created_date'] = pd.to_datetime(df['created_date'])
        min_from_date = df['created_date'].min()
        # Generate a date range from the minimum 'From_date' to the current date
        print(min_from_date)
        yesterday = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0) - timedelta(days=1)
        date_range = pd.date_range(start=min_from_date, end=yesterday, freq='4D')
       
        print(datetime.utcnow())
        new_data = {
            'date': date_range,
            'count': [(((df['created_date'] <= date) & (df['valid_upto'] >= date)) | df['isactive'] == True).sum() for date in date_range]
        }
 
        # Convert the new_data to a list of dictionaries and cast the counts to native Python int
        data_list = [{'date': str(date.date()), 'count': int(count)} for date, count in zip(new_data['date'], new_data['count'])]
        # Get today's date
        today = pd.Timestamp(datetime.now().date())
 
        # Count records where enddate is today
        count_today = (((df['created_date'] <= today) & (df['valid_upto'] >= today)) | df['isactive'] == True).sum()
        result = {
            'date': str(today.date()),  # Convert date to string
            'count': int(count_today)  # Ensure count is an integer
        }
        data_list.append(result)
        # data_list.reverse()
        # Return the JSON response
        return jsonify(data_list)
    except Exception as e:
        # Print the error to the console for debugging
        print(f"Error occurred: {e}")
        # session.rollback()
        # Return a JSON response indicating an internal server error
        return jsonify({'error': 'An internal server error occurred.'}), 500

# @app.route('/api/line-chart-data', methods=['GET'])
# def get_line_chart_data():
#     # Query to count active programs by month and year
#     query = session.query(
#         func.date_format(ExceptionResult.created_date, '%Y-%m').label('month'),
#         func.count().label('active_count')
#     ).filter(ExceptionResult.isactive == 0
#     ).group_by(func.date_format(ExceptionResult.created_date, '%Y-%m')
#     ).order_by(func.date_format(ExceptionResult.created_date, '%Y-%m')
#     ).all()
#     print(query)
#     # Convert query result to a list of dictionaries
#     result = [{'date': month, 'active_count': active_count} for month, active_count in query]

#     return jsonify(result)

# # Get only Filtered Records
# @app.route('/api/exception_results/<int:exception_id>',methods=['GET'])
# def get_filtered_exceptions():
#     try:
#         data = request.get_json()
#         exception_id = data.get('exception_id')
#         result = pd.read_sql_query(f'SELECT * FROM 250k_new_dataseter WHERE exception_id = {exception_id}',engine)
#         print(result_df)
#         result_list = [{
#             "id": result.id,
#             "primary_key": result.primary_key,
#             "created_date": result.created_date,
#             "created_time": result.created_time,
#             "exception_id": result.exception_id,
#             "logic": result.logic
#         } for result in results]
 
#         return jsonify(result_list), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

@app.route('/api/exception_results', methods=['GET'])
@app.route('/api/exception_results/<int:exception_id>', methods=['GET'])
def get_exception_results(exception_id=None):
    session = Session()
    try:
        if exception_id:
            # Fetch filtered results by exception_id
            print(f"Fetching records for exception_id: {exception_id}")
            results = session.query(ExceptionResult).filter_by(exception_id=exception_id).all()
        else:
            # Fetch all records
            print("Fetching all exception records")
            results = session.query(ExceptionResult).all()
            # results = pd.read_sql_query(f'SELECT * FROM exception_result2',engine)
 
        if not results:
            return jsonify({"message": "No records found"}), 404
 
        # result_list['created_time'] = pd.to_datetime(result_list['created_time']).dt.strftime('%Y-%m-%d')
        # Serialize the query results into a list of dictionaries
        result_list = [{
            "id": result.id,
            "primary_key": result.primary_key,
            "created_date": result.created_date,
            "created_time": result.created_time,
            "valid_upto": result.valid_upto,
            "exception_id": result.exception_id,
            "logic": result.logic,
            "isactive": result.isactive
        } for result in results]
 
        return jsonify(result_list), 200
 
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()

@app.route('/api/exception_stats', methods=['GET'])
def get_exception_stats():
    session = Session()
    try:
        # 1. Get the total number of records in the table
        total_records = session.query(func.count(ExceptionResult.id)).scalar()
 
        # 2. Get the total number of records grouped by exception_id
        records_by_exception_id = session.query(
            ExceptionResult.exception_id,
            func.count(ExceptionResult.id).label('count')
        ).group_by(ExceptionResult.exception_id).all()
 
        # Format the response
        exception_count_list = [{
            "exception_id": result[0],
            "count": result[1]
        } for result in records_by_exception_id]
 
        response = {
            "total_records": total_records,
            "records_by_exception_id": exception_count_list
        }
 
        return jsonify(response), 200
 
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()

if __name__ == '__main__':
    # Create the database and tables if they don't exist
    Base.metadata.create_all(engine)
    
    # Run the Flask app on port 5000 (or any port you prefer)
    app.run(debug=True, port=5000)
