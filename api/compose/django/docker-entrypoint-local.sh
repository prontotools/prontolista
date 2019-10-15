#!/bin/bash

cd prontolista
poetry run python manage.py migrate 0.0.0.0:8000
poetry run python manage.py runserver 0.0.0.0:8000
