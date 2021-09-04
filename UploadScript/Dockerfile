FROM python:3.8
ADD ./Python ./code
WORKDIR /code
RUN pip install -r requirements.txt
CMD ["python", "CsvToPostgres.py"]