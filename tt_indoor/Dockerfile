FROM python:3.12

RUN apt-get update && apt-get install -y build-essential libpq-dev

WORKDIR /app

COPY tt_indoor/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

WORKDIR /app/tt_indoor

RUN python manage.py collectstatic --noinput
RUN python manage.py makemigrations
RUN python manage.py migrate

EXPOSE 8000

ENV PYTHONUNBUFFERED=1

# CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "tt_indoor.settings.asgi:application"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
