#!/bin/bash

poetry run ansible-playbook -i development provision.yml --private-key rocket-prontolista-dev --ask-vault-pass
