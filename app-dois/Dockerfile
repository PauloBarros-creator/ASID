# syntax=docker/dockerfile:1

FROM python:latest

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

EXPOSE 5001

COPY server.py . 

CMD [ "python3", "server.py"]