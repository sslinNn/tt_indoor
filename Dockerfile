FROM python:3.12
LABEL authors="sslinnn"

WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python3 manage.py runserver"]