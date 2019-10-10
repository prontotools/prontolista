FROM python:3.7.4-slim

ENV PIP_DISABLE_PIP_VERSION_CHECK=on

RUN pip install poetry==0.12.17

COPY poetry.lock pyproject.toml /
RUN poetry config settings.virtualenvs.create false
RUN poetry install --no-interaction
COPY . /app/
COPY docker-entrypoint.sh /
WORKDIR /app
RUN chmod +x /docker-entrypoint.sh
