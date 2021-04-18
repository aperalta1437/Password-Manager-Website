import sqlite3

file_name = None
connection = None
cursor = None


def create_table(table_name, db_file_name=None, **kwargs):
    db_connection, db_cursor = get_db_connection(db_file_name)

    query = 'CREATE TABLE IF NOT EXISTS ' + table_name + '('

    for field in kwargs:
        query += f'{field} {kwargs[field]}, '

    query = query[:-2] + ');'
    print(query)
    db_cursor.execute(query)

    if db_file_name:
        close_db_connection()


def create_table_composite_key(table_name, composite_key, db_file_name=None, **kwargs):
    db_connection, db_cursor = get_db_connection(db_file_name)

    query = 'CREATE TABLE IF NOT EXISTS ' + table_name + '('

    for field in kwargs:
        query += f'{field} {kwargs[field]}, '

    query += 'PRIMARY KEY ('

    for key in composite_key:
        query += f'{key}, ' 

    query = query[:-2] + '));'
    print(query)
    db_cursor.execute(query)

    if db_file_name:
        close_db_connection()


def get_db_connection(db_file_name):
    if not connection:
        if db_file_name:
            db_connection = open_db_connection(db_file_name)
            db_cursor = db_connection.cursor()
        else:
            raise ValueError("Database file name was not specified.")
    else:
        if db_file_name:
            if db_file_name == file_name:
                db_connection = connection
                db_cursor = cursor
            else:
                db_connection = open_db_connection(db_file_name)
                db_cursor = db_connection.cursor()
        else:
            db_connection = connection
            db_cursor = cursor

    return db_connection, db_cursor


def select_data(table_name, db_file_name=None, *select_fields, **where_fields):
    db_connection, db_cursor = get_db_connection(db_file_name)

    query = f'SELECT '
    select_added = False

    for field in select_fields:
        query += f'{field}, '
        select_added = True

    if select_added:
        query = f'{query[:-2]} FROM {table_name} WHERE '
    else:
        query += f'* FROM {table_name} WHERE '

    where_added = False

    for key_field in where_fields:
        query += f'{key_field} = {where_fields[key_field]}, '
        where_added = True

    if where_added:
        query = f'{query[:-2]};'
    else:
        query = f'{query[:-7]};'
    # print(query)

    db_cursor.execute(query)
    results = db_cursor.fetchall()

    if db_file_name:
        close_db_connection()

    return results


def delete_data(table_name, db_file_name=None, **where_fields):
    db_connection, db_cursor = get_db_connection(db_file_name)

    query = f'DELETE FROM {table_name} WHERE '
    where_added = False
    for where_key in where_fields:
        query += f'{where_key} = {where_fields[where_key]} AND '
        where_added = True
    if where_added:
        query = f'{query[:-5]};'
    else:
        query = f'{query[:-7]};'
    # print(query)

    db_cursor.execute(query)

    if db_file_name:
        close_db_connection()


def update_data(table_name, db_file_name=None, **set_n_where_fields):
    db_connection, db_cursor = get_db_connection(db_file_name)

    query = f'UPDATE {table_name} SET '
    set_added = False
    for set_key in set_n_where_fields['SET']:
        query += f'{set_key} = {set_n_where_fields["SET"][set_key]}, '
        set_added = True
    if set_added:
        query = f'{query[:-2]} WHERE '
    else:
        query = f'{query[:-5]} WHERE '
    where_added = False
    for where_key in set_n_where_fields['WHERE']:
        query += f'{where_key} = {set_n_where_fields["WHERE"][where_key]} AND '
        where_added = True
    if where_added:
        query = f'{query[:-5]};'
    else:
        query = f'{query[:-7]};'
    # print(query)

    db_cursor.execute(query)

    if db_file_name:
        close_db_connection()


def insert_row(table_name, db_file_name=None, **kwargs):
    db_connection, db_cursor = get_db_connection(db_file_name)

    query = f'INSERT INTO {table_name} ('
    for field in kwargs:
        query += f'{field}, '
    query = f'{query[:-2]}) VALUES('
    for field in kwargs:
        field_data_type = get_table_column_data_type(table_name, field)

        if kwargs[field] is None:
            query += 'NULL, '
        elif field_data_type == 'TEXT':
            value = str(kwargs[field])
            value = value.strip('\"')
            value = value.strip('\'')
            query += f"'{value}', "
        else:
            query += f'{kwargs[field]}, '
    query = f'{query[:-2]});'

    print(query)

    db_cursor.execute(query)

    if db_file_name:
        close_db_connection()


def show_table(table_name):
    query = f'SELECT * FROM {table_name};'
    cursor.execute(query)
    results = cursor.fetchall()
    print(results)


def clean_table(table_name, db_file_name=None):
    db_connection, db_cursor = get_db_connection(db_file_name)
    query = 'DELETE FROM ' + table_name
    db_cursor.execute(query)

    if db_file_name:
        close_db_connection()


def open_db_connection(db_file_name):
    global connection, cursor, file_name

    if connection:
        close_db_connection()

    file_name = db_file_name
    connection = sqlite3.connect(db_file_name)
    cursor = connection.cursor()
    return connection


def close_db_connection():
    global connection, cursor, file_name

    if connection:
        connection.commit()
        connection.close()

    connection, cursor, file_name = None, None, None


def execute_query(query, db_file_name=None):
    if db_file_name is None:
        cursor.execute(query)
        return cursor.fetchall()
    else:
        db_connection = sqlite3.connect(db_file_name)
        db_cursor = db_connection.cursor()
        db_cursor.execute(query)
        return db_cursor.fetchall()


def show_table_columns_info(table_name):
    cursor.execute(f'PRAGMA TABLE_INFO({table_name})')
    results = cursor.fetchall()
    print(results)


def get_table_column_data_type(table_name, column_name, db_file_name=None):
    db_connection, db_cursor = get_db_connection(db_file_name)

    db_cursor.execute(f'PRAGMA TABLE_INFO({table_name})')
    columns_info = db_cursor.fetchall()

    for curr_column_info in columns_info:
        curr_column_name = curr_column_info[1]
        if curr_column_name == column_name:
            column_data_type = curr_column_info[2]
            return column_data_type
    else:
        raise ValueError('Column was not found in the table.')

def drop_table(table_name, db_file_name=None):
    db_connection, db_cursor = get_db_connection(db_file_name)

    db_cursor.execute(f'DROP TABLE {table_name}')


db_file_name = '.\\data\\password_manager.db'

open_db_connection(db_file_name)


# drop_table('USERS', db_file_name=db_file_name)
# drop_table('RECORDS', db_file_name=db_file_name)

create_table('USERS', db_file_name=db_file_name, MASTER_USERNAME='TEXT PRIMARY KEY NOT NULL', MASTER_PASSWORD='TEXT', SALT='BLOB')
create_table_composite_key('RECORDS', composite_key=('MASTER_USERNAME', 'RECORD_ID'), db_file_name=db_file_name, MASTER_USERNAME='TEXT', RECORD_ID='INTEGER', DOMAIN_URL='TEXT', USERNAME='TEXT', PASSWORD='TEXT', PASSWORD_SALT='BLOB')


# insert_row('USERS', MASTER_USERNAME='amp7320', MASTER_PASSWORD='Password1')

# print(type(select_data(table_name, None, 'VARIABLE_NAME', 'CURRENT_VALUE', 'DEFAULT_VALUE')[1][1]))

# show_table(table_name)

# clean_table(table_name, db_file_name)

close_db_connection()