#!/bin/bash

poetry run ansible-playbook -i production provision.yml --private-key rocket-prontolista-production --ask-vault-pass
