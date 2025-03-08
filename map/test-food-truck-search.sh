#!/bin/bash

# Memphis downtown coordinates
LAT=35.1495
LNG=-90.0490

echo "Testing food truck search for Memphis (${LAT}, ${LNG})"

# Make the API request and format the output using jq
curl -s "https://food-truck-api-main-4443f2d.d2.zuplo.dev/api/google-search?lat=${LAT}&lng=${LNG}"
