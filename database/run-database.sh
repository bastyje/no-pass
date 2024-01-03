#!/bin/sh

path="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )/compose.yml"

docker compose -f $path up
