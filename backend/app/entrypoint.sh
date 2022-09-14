#!/bin/sh

set -e

# flask db stamp head
# flask db migrate
flask db upgrade

flask run --host=0.0.0.0