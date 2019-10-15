#!/bin/bash

aws configure --profile prontolista set aws_access_key_id ${AWS_ACCESS_KEY_ID}
aws configure --profile prontolista set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}

docker build -f compose/django/Dockerfile-dev -t 133506877714.dkr.ecr.eu-west-1.amazonaws.com/prontolista:${CIRCLE_SHA1} .
docker push 133506877714.dkr.ecr.eu-west-1.amazonaws.com/prontolista:${CIRCLE_SHA1}
