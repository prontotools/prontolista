#!/bin/bash

poetry run ansible-playbook -v -i development create_django_superuser.yml --private-key rocket-prontolista-dev
