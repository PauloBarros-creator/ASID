# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY mqtt2mongo.py . 

CMD [ "python3", "mqtt2mongo.py"]