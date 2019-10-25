#!/bin/bash

cd prontolista
poetry run python manage.py migrate --settings=prontolista.settings.production
poetry run python manage.py collectstatic --noinput --settings=prontolista.settings.production
poetry run python manage.py runserver 0.0.0.0:8000 --settings=prontolista.settings.production
