#!/bin/bash

poetry run aws configure --profile prontolista set aws_access_key_id $AWS_ACCESS_KEY_ID
poetry run aws configure --profile prontolista set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
eval $(poetry run aws ecr get-login --no-include-email --region eu-west-1 --profile prontolista)

export GIT_COMMIT_SHORT=$(echo $CIRCLE_SHA1 | cut -c 1-8)

docker build -f compose/django/Dockerfile-dev -t 133506877714.dkr.ecr.eu-west-1.amazonaws.com/prontolista:$GIT_COMMIT_SHORT .
docker push 133506877714.dkr.ecr.eu-west-1.amazonaws.com/prontolista:$GIT_COMMIT_SHORT
