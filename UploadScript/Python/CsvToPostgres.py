import psycopg2
from os import listdir, environ
from os.path import splitext, join

from psycopg2 import extensions


CSV_NO_FK = environ.get('CSV_WITHOUT_FK_DIR_PATH')
CSV_WITH_FK = environ.get('CSV_WITH_FK_DIR_PATH')
HOST = environ.get('PGHOST')
PORT = environ.get('PGPORT')
DBNAME = environ.get('PGDATABASE')
USER = environ.get('PGUSER')
PASSWORD = environ.get('PGPASSWORD')


def insert_tables_from_files(con, cur: extensions.cursor, files_dir):
    for file in listdir(files_dir):
        with open(join(files_dir, file), 'r', encoding='utf-8') as f:
            table_name = splitext(file)[0]
            # Skip Headers row
            # headers = next(f)
            # print(headers)
            print(table_name)

            cur.copy_expert(f"""
            copy public.{table_name} FROM STDIN DELIMITER ',' CSV HEADER QUOTE '\"' null '\\N' ESCAPE '''';
            """, f)
        con.commit()

with psycopg2.connect(f"host='{HOST}' port='{PORT}' dbname='{DBNAME}' user='{USER}' password='{PASSWORD}'") as conn:
    cursor: extensions.cursor = conn.cursor()
    insert_tables_from_files(conn, cursor, CSV_NO_FK)
    insert_tables_from_files(conn, cursor, CSV_WITH_FK)