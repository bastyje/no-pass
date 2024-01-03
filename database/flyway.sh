#!/bin/bash
abs_path="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
docker run --rm --network=host -it -v="$(echo $abs_path)":/database flyway/flyway:latest -configFiles="/database/flyway/conf/flyway.properties" repair migrate