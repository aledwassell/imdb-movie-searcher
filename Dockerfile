FROM python:3.9.12

LABEL maintainer="aledwassell@gmail.com"

RUN mkdir -p /api

WORKDIR /api

RUN pip install --no-cache-dir pip

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "main.py"]